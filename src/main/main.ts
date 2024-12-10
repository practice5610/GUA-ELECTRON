// import puppeteer from 'puppeteer-core';
import { connect } from 'puppeteer-real-browser';

import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const openGoogleInChrome = async (url: string) => {
//   try {
//     const browser = await puppeteer.launch({
//       headless: false, // Set to false to see the Chrome window
//       executablePath:
//         'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // Adjust the path as needed
//       args: ['--no-sandbox', '--disable-setuid-sandbox'], // Necessary for some environments
//     });

//     const page = await browser.newPage();
//     await page.goto(url, { waitUntil: 'domcontentloaded' });
//     console.log(`Opened ${url} in a separate Chrome window.`);
//   } catch (error) {
//     console.error('Failed to open the URL in Chrome:', error);
//   }
// };
const performLogin = async (email: string, password: string) => {
  try {
    const { page } = await connect({
      headless: false,
      fingerprint: true,
      ignoreHTTPSErrors: true,
      defaultViewport: null,
      args: ['--no-sandbox'],
    });

    await page.goto('https://portal.ustraveldocs.com', {
      waitUntil: 'load',
      timeout: 0,
    });
    await sleep(3000);
    // Ensure the element is available (increase timeout if necessary)
    await page.waitForSelector(
      '#loginPage\\:SiteTemplate\\:siteLogin\\:loginComponent\\:loginForm\\:username',
      { timeout: 20000 }, // Increase timeout
    );

    console.log('Username field is visible');

    // Fill in the username
    await page.type(
      '#loginPage\\:SiteTemplate\\:siteLogin\\:loginComponent\\:loginForm\\:username',
      email,
      { delay: 50 },
    );

    // Fill in the password
    await page.type(
      '#loginPage\\:SiteTemplate\\:siteLogin\\:loginComponent\\:loginForm\\:password',
      password,
      { delay: 50 },
    );

    // Wait for the checkbox to be visible
    const checkboxSelector =
      'input[name="loginPage:SiteTemplate:siteLogin:loginComponent:loginForm:j_id167"]';
    await page.waitForSelector(checkboxSelector, { visible: true });
    await page.click(checkboxSelector);

    // Click the login button
    await page.click(
      '#loginPage\\:SiteTemplate\\:siteLogin\\:loginComponent\\:loginForm\\:loginButton',
    );

    // Wait for either navigation or an error message
    const errorSelector =
      '#loginPage\\:SiteTemplate\\:siteLogin\\:loginComponent\\:loginForm\\:error\\:j_id132\\:j_id133\\:0\\:j_id134';
    const navigationPromise = page.waitForNavigation({
      waitUntil: 'networkidle2',
    });
    const errorPromise = page.waitForSelector(errorSelector, { visible: true });

    const result = await Promise.race([navigationPromise, errorPromise]);

    if (result === errorPromise) {
      console.error('Login failed: Invalid username or password.');
      return false;
    }
    await sleep(4000);
    await page.close();
    console.log('Login successful!');
    return await page.cookies();
  } catch (error) {
    // Debug: print the current page's content
    console.error('Error during login:', error);
    const content = await page.content();
    console.log('Page content:', content);
    return false;
  }
};
ipcMain.on('login-event', (event, data) => {
  console.log('cehckdata', data);
  performLogin(data.email, data.password);
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
