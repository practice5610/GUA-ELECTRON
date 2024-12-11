// import puppeteer from 'puppeteer-core';
import { connect } from 'puppeteer-real-browser';

import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import path from 'path';
import fs from 'fs/promises';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

const COOKIES_DIR = './cookies';
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
const ensureCookiesDir = async () => {
  try {
    await fs.mkdir(COOKIES_DIR, { recursive: true });
  } catch (error) {
    console.error('Error ensuring cookies directory:', error);
  }
};

// Save cookies for a user
const saveUserCookies = async (email: string, cookies: any) => {
  try {
    await ensureCookiesDir();
    const filePath = path.join(COOKIES_DIR, `${email}.json`);
    await fs.writeFile(filePath, JSON.stringify(cookies, null, 2));
    console.log(`Cookies saved for user: ${email}`);
  } catch (error) {
    console.error('Error saving user cookies:', error);
  }
};

// Get all users' cookies
const getAllUsersCookies = async () => {
  try {
    await ensureCookiesDir();
    const files = await fs.readdir(COOKIES_DIR);
    const cookies = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(COOKIES_DIR, file);
        const data = await fs.readFile(filePath, 'utf-8');
        return {
          email: path.basename(file, '.json'),
          cookies: JSON.parse(data),
        };
      }),
    );
    return cookies;
  } catch (error) {
    console.error('Error retrieving all users cookies:', error);
    return [];
  }
};
const getUserCookiesByEmail = async (email: string) => {
  try {
    await ensureCookiesDir();
    const filePath = path.join(COOKIES_DIR, `${email}.json`);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error retrieving cookies for user ${email}:`, error);
    return null;
  }
};
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
    page.setDefaultTimeout(120000);
    await page.goto('https://portal.ustraveldocs.com');

    await page.waitForNavigation({
      waitUntil: 'networkidle0',
    });

    await sleep(3000);
    console.log('loadeddd-----');
    // Ensure the element is available (increase timeout if necessary)
    await page.waitForSelector(
      '#loginPage\\:SiteTemplate\\:siteLogin\\:loginComponent\\:loginForm\\:username',
      { timeout: 60000 }, // Increase timeout
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

    const checkboxSelector =
      'input[name="loginPage:SiteTemplate:siteLogin:loginComponent:loginForm:j_id167"]';
    await page.waitForSelector(checkboxSelector, { visible: true });
    await page.click(checkboxSelector);

    // Click the login button
    await page.click(
      '#loginPage\\:SiteTemplate\\:siteLogin\\:loginComponent\\:loginForm\\:loginButton',
    );

    // Wait for either navigation or an error message
    await page.waitForNavigation({
      waitUntil: 'networkidle0',
    });
    await sleep(8000);
    const currentUrl = page.url();
    console.log(`urll: ${currentUrl}`);
    if (currentUrl === 'https://portal.ustraveldocs.com/applicanthome') {
      console.log('user logged in succcessfully');
      const cookies = await page.cookies();
      await saveUserCookies(email, cookies);
      return true;
    } else {
      return false;
    }

    // await page.close();
  } catch (error) {
    console.error('Error during login:', error);

    return false;
  }
};
ipcMain.on('get-users', async (event) => {
  try {
    const users = await getAllUsersCookies(); // Wait for the promise to resolve
    console.log('users', users); // Logs the resolved users array
    event.sender.send('users-data', users); // Send the resolved data back to the renderer
  } catch (error) {
    console.error('Error fetching users:', error);
    event.sender.send('users-data-error', 'Failed to fetch users');
  }
});

ipcMain.on('login-event', (event, data) => {
  // console.log('cehckdata', data);
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
