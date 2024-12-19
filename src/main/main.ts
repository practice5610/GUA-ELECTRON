// import puppeteer from 'puppeteer-core';
import { connect } from 'puppeteer-real-browser';

import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import path from 'path';
import fs from 'fs/promises';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { CookieParam } from 'puppeteer-core';

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
const saveUserCookies = async (email: string, cookies: any[]) => {
  try {
    await ensureCookiesDir(); // Ensure the cookies directory exists

    const filePath = path.join(COOKIES_DIR, `${email}.json`);

    // Check if the file exists
    try {
      await fs.access(filePath); // If the file exists, no error will be thrown
      await fs.unlink(filePath); // Delete the existing file
      console.log(`Previous cookie file deleted for user: ${email}`);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        // If the error is not "file not found," rethrow it
        throw err;
      }
      console.log(`No existing cookie file found for user: ${email}`);
    }

    // List of cookie names to exclude
    const excludedCookieNames = [
      '__cf_bm',
      '__utmz',
      '__utma',
      '__utmt',
      'LSKey-c$CookieConsentPolicy',
      'CookieConsentPolicy',
      '__utmc',
      '__utmb',
      'cf_clearance',
    ];

    // Filter out cookies with excluded names
    const filteredCookies = cookies.filter(
      (cookie) => !excludedCookieNames.includes(cookie.name),
    );
    console.log('Filtered Cookies:', filteredCookies);

    if (filteredCookies.length > 0) {
      // Write the new cookie file
      await fs.writeFile(filePath, JSON.stringify(filteredCookies, null, 2));
      console.log(`Cookies saved for user: ${email}`);
    } else {
      console.log('No cookies to save after filtering.');
    }
  } catch (error) {
    console.error('Error saving user cookies:', error.message);
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
    const connectWithProxy = async () => {
      const proxies = [
        {
          host: '103.171.51.37',
          port: 59100,
          username: 'practice56101',
          password: 'Bk4SsGh9ZV',
        },
        {
          host: '45.112.173.159',
          port: 59100,
          username: 'practice56101',
          password: 'Bk4SsGh9ZV',
        },
      ];

      const randomProxy = proxies[Math.floor(Math.random() * proxies.length)];
      console.log(`Using proxy: ${randomProxy.host}:${randomProxy.port}`);

      return await connect({
        headless: false,
        fingerprint: true,
        proxy: {
          host: randomProxy.host,
          port: randomProxy.port,
          username: randomProxy.username,
          password: randomProxy.password,
        },
        ignoreHTTPSErrors: true,
        defaultViewport: null,
        args: ['--no-sandbox'],
      });
    };

    // Initial connection attempt
    let { page } = await connect({
      headless: false,
      fingerprint: true,
      ignoreHTTPSErrors: true,
      defaultViewport: null,
      args: ['--no-sandbox'],
    });

    page.setDefaultTimeout(120000);
    await page.goto('https://portal.ustraveldocs.com');

    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // Check for rate-limiting error
    const rateLimitError = await page.$('#cf-error-details');
    if (rateLimitError) {
      console.error('Rate limiting detected, retrying with a proxy...');

      // Close the current page to clean up resources
      await page.close();

      // Retry with a proxy
      ({ page } = await connectWithProxy());
      await page.goto('https://portal.ustraveldocs.com');
      await page.waitForNavigation({ waitUntil: 'networkidle0' });
    } else {
      console.log('No rate limiting detected, continuing with normal flow...');
    }

    await sleep(3000);
    console.log('Page loaded...');

    // Proceed with login process
    await page.waitForSelector(
      '#loginPage\\:SiteTemplate\\:siteLogin\\:loginComponent\\:loginForm\\:username',
      { timeout: 60000 },
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
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    await sleep(8000);

    const currentUrl = page.url();
    console.log(`URL: ${currentUrl}`);
    if (currentUrl === 'https://portal.ustraveldocs.com/applicanthome') {
      console.log('User logged in successfully');
      const cookies = await page.cookies();
      await saveUserCookies(email, cookies);
      await page.close();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error during login:', error);
    return false;
  }
};

const performReLogin = async (cookies: CookieParam[]) => {
  try {
    const connectWithProxy = async () => {
      const proxies = [
        {
          host: '103.171.51.37',
          port: 59100,
          username: 'practice56101',
          password: 'Bk4SsGh9ZV',
        },
        {
          host: '45.112.173.159',
          port: 59100,
          username: 'practice56101',
          password: 'Bk4SsGh9ZV',
        },
      ];

      const randomProxy = proxies[Math.floor(Math.random() * proxies.length)];
      console.log(`Using proxy: ${randomProxy.host}:${randomProxy.port}`);

      return await connect({
        headless: false,
        fingerprint: true,
        proxy: {
          host: randomProxy.host,
          port: randomProxy.port,
          username: randomProxy.username,
          password: randomProxy.password,
        },
        ignoreHTTPSErrors: true,
        defaultViewport: null,
        args: ['--no-sandbox'],
      });
    };

    // Initial connection attempt
    let { page } = await connect({
      headless: false,
      fingerprint: true,
      ignoreHTTPSErrors: true,
      defaultViewport: null,
      args: ['--no-sandbox'],
    });

    page.setDefaultTimeout(120000);
    await page.goto('https://portal.ustraveldocs.com');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // Check for rate-limiting error
    const rateLimitError = await page.$('#cf-error-details');
    if (rateLimitError) {
      console.error('Rate limiting detected, retrying with a proxy...');

      // Close the current page to clean up resources
      await page.close();

      // Retry with a proxy
      ({ page } = await connectWithProxy());
      await page.goto('https://portal.ustraveldocs.com');
      await page.waitForNavigation({ waitUntil: 'networkidle0' });
    } else {
      console.log('No rate limiting detected, continuing with normal flow...');
    }

    // Now set cookies regardless of rate limiting detection
    await sleep(3000);
    console.log('Setting cookies...');

    // Spread the cookies array
    await page.setCookie(...cookies);
    await page.goto('https://portal.ustraveldocs.com/applicanthome');
    await page.waitForNavigation({
      waitUntil: 'networkidle0',
    });

    console.log('Login process completed successfully.');
    // await page.close();
    return true; // Indicate success
  } catch (error) {
    console.error('Error during login:', error);
    return false; // Indicate failure
  }
};

const bookAppointment = async (cookies, formData) => {
  try {
    // Function to connect with a random proxy
    const connectWithProxy = async () => {
      const proxies = [
        {
          host: '103.171.51.37',
          port: 59100,
          username: 'practice56101',
          password: 'Bk4SsGh9ZV',
        },
        {
          host: '45.112.173.159',
          port: 59100,
          username: 'practice56101',
          password: 'Bk4SsGh9ZV',
        },
      ];

      const randomProxy = proxies[Math.floor(Math.random() * proxies.length)];
      console.log(`Using proxy: ${randomProxy.host}:${randomProxy.port}`);

      return await connect({
        headless: false,
        fingerprint: true,
        proxy: {
          host: randomProxy.host,
          port: randomProxy.port,
          username: randomProxy.username,
          password: randomProxy.password,
        },
        ignoreHTTPSErrors: true,
        defaultViewport: null,
        args: ['--no-sandbox'],
      });
    };

    // Initial connection attempt
    let { page } = await connect({
      headless: false,
      fingerprint: true,
      ignoreHTTPSErrors: true,
      defaultViewport: null,
      args: ['--no-sandbox'],
    });

    page.setDefaultTimeout(120000);
    await page.goto('https://portal.ustraveldocs.com');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    const blocked = await page
      .waitForSelector('#cf-error-details', { timeout: 5000 })
      .catch(() => null);
    console.log('blocked', blocked);
    if (blocked) {
      console.error(
        'Blocked by Cloudflare. Retrying with a different proxy...',
      );
      await page.close();
      ({ page } = await connectWithProxy());
      await page.goto('https://portal.ustraveldocs.com');
      await page.waitForNavigation({ waitUntil: 'networkidle0' });
    }

    // Check for rate-limiting error
    const rateLimitError = await page
      .waitForSelector('#cf-error-details', { timeout: 3000 })
      .catch(() => null);

    if (rateLimitError) {
      console.error('Rate limiting detected, retrying with a proxy...');

      // Close the current page to clean up resources
      await page.close();

      // Retry with a proxy
      ({ page } = await connectWithProxy());
      await page.goto('https://portal.ustraveldocs.com');
      await page.waitForNavigation({ waitUntil: 'networkidle0' });
    } else {
      console.log('No rate limiting detected, continuing with normal flow...');
    }

    // Set cookies and navigate to user home
    console.log('Setting cookies...');
    await page.setCookie(...cookies);
    await page.goto('https://portal.ustraveldocs.com/applicanthome', {
      waitUntil: 'networkidle2',
    });
    console.log('network kindle finished');

    if (rateLimitError) {
      console.error('Rate limiting detected, retrying with a proxy...');

      // Close the current page to clean up resources
      await page.close();

      // Retry with a proxy
      ({ page } = await connectWithProxy());
      await page.goto('https://portal.ustraveldocs.com/applicanthome');
      await page.waitForNavigation({ waitUntil: 'networkidle0' });
    } else {
      console.log('No rate limiting detected, continuing with normal flow...');
    }
    // Check sidebar and proceed
    console.log('Checking for sidebar...');
    const sidebar = await page
      .waitForSelector('#sidebar', { timeout: 5000 })
      .catch(() => null);
    if (sidebar) {
      console.log(
        'Sidebar found. Navigating to "New Application / Schedule Appointment"...',
      );
      await page.click(
        'a[onclick*="j_id0:SiteTemplate:j_id52:j_id53:j_id54:j_id61"]',
      );
      await page.waitForNavigation({ waitUntil: 'networkidle0' });

      console.log('Navigating to the Visa Type page...');
    } else {
      console.error('Sidebar not found. User may not be logged in.');
    }
    if (page.url().includes('selectvisatype')) {
      // Check if the form exists
      const formExists = await page.$('form#j_id0\\:SiteTemplate\\:theForm');
      if (formExists) {
        console.log('Form found. Filling in form data...');

        try {
          // Select the appropriate radio button
          const visaType = formData.userType; // 'immigrant' or 'nonImmigrant'

          if (visaType === 'immigrant') {
            console.log('Selecting Immigrant Visa...');
            await page.click('#j_id0\\:SiteTemplate\\:theForm\\:ttip\\:1');
            console.log('Immigrant Visa selected.');
          } else if (visaType === 'nonImmigrant') {
            console.log('Selecting Nonimmigrant Visa...');
            await page.click('#j_id0\\:SiteTemplate\\:theForm\\:ttip\\:2');

            // Handle the disclaimer dialog
            const dialog = await page
              .waitForSelector('.ui-dialog', { timeout: 3000 })
              .catch(() => null);
            if (dialog) {
              console.log('Disclaimer found. Clicking OK button...');
              await page.click('.ui-dialog .ui-button');
              console.log('OK button clicked.');
            } else {
              console.log('Disclaimer not found.');
            }
          } else {
            console.error(`Invalid userType provided: ${visaType}`);
            return;
          }

          // Click the Continue button
          console.log('Clicking Continue...');
          await page.click('input[name="j_id0:SiteTemplate:theForm:j_id176"]');

          // Wait for navigation to complete
          await page.waitForNavigation({ waitUntil: 'networkidle0' });
          console.log('Form submission successful.');
        } catch (error) {
          console.error(`Error during form handling: ${error.message}`);
        }
      } else {
        console.error('Form not found.');
      }
    } else {
      console.error('Failed to navigate to the Visa Type page.');
    }

    if (page.url().includes('selectpost')) {
      await page.waitForSelector('form#j_id0\\:SiteTemplate\\:j_id112'); // Escape colons in IDs with \\

      // Select the desired radio button (e.g., ISLAMABAD IV)
      if (formData.centre === 'islamabad') {
        await page.click('input#j_id0\\:SiteTemplate\\:j_id112\\:j_id165\\:0');
        console.log('Selected: ISLAMABAD IV');
      } else if (formData.centre === 'karachi') {
        await page.click('input#j_id0\\:SiteTemplate\\:j_id112\\:j_id165\\:1');
        console.log('Selected: KARACHI');
      } else {
        console.error('Invalid post selected.');

        return;
      }

      // Click the "Continue" button
      await page.click('input[name="j_id0:SiteTemplate:j_id112:j_id169"]');
      console.log('Clicked "Continue" button.');

      // Wait for the next page to load (if applicable)
      await page.waitForNavigation({ waitUntil: 'networkidle2' });
      console.log('Form submitted and navigated to the next page.');
    } else {
      console.error('Failed to navigate to the select post page.');
    }

    if (page.url().includes('selectvisacategory')) {
      console.log(
        'Visa Category page found. Selecting the appropriate category...',
      );

      // Select the appropriate category based on formData.category
      if (formData.category === 'sb1') {
        // SB1 selection (keeping your existing logic)
        await page.evaluate(() => {
          const label = Array.from(document.querySelectorAll('label')).find(
            (label) =>
              label.textContent.includes(
                'SB1, Determining Returning Resident Status',
              ),
          );
          if (label) {
            label.previousElementSibling.click(); // Click the radio input before the label
          }
        });
        console.log('Selected: SB1, Determining Returning Resident Status');
      } else if (formData.category === 'lpr') {
        // LPR selection (keeping your existing logic)
        await page.evaluate(() => {
          const label = Array.from(document.querySelectorAll('label')).find(
            (label) =>
              label.textContent.includes(
                'LPR - Boarding Foil for lost/stolen/expired Green Cards',
              ),
          );
          if (label) {
            label.previousElementSibling.click(); // Click the radio input before the label
          }
        });
        console.log(
          'Selected: LPR - Boarding Foil for lost/stolen/expired Green Cards',
        );
      } else if (formData.category === 'sev') {
        // Students and Exchange Visitors
        await page.evaluate(() => {
          const label = Array.from(document.querySelectorAll('label')).find(
            (label) =>
              label.textContent.includes('Students and Exchange Visitors'),
          );
          if (label) {
            label.previousElementSibling.click(); // Click the radio input before the label
          }
        });
        console.log('Selected: Students and Exchange Visitors');
      } else if (formData.category === 'btv') {
        // Business & Tourism Visitors
        await page.evaluate(() => {
          const label = Array.from(document.querySelectorAll('label')).find(
            (label) =>
              label.textContent.includes('Business & Tourism Visitors'),
          );
          if (label) {
            label.previousElementSibling.click(); // Click the radio input before the label
          }
        });
        console.log('Selected: Business & Tourism Visitors');
      } else if (formData.category === 'wpb') {
        // Work, Petition Based & All Others
        await page.evaluate(() => {
          const label = Array.from(document.querySelectorAll('label')).find(
            (label) =>
              label.textContent.includes('Work, Petition Based & All Others'),
          );
          if (label) {
            label.previousElementSibling.click(); // Click the radio input before the label
          }
        });
        console.log('Selected: Work, Petition Based & All Others');
      } else if (formData.category === 'gsep') {
        // U.S. Government Sponsored Exchange Program
        await page.evaluate(() => {
          const label = Array.from(document.querySelectorAll('label')).find(
            (label) =>
              label.textContent.includes(
                'U.S. Government Sponsored Exchange Program',
              ),
          );
          if (label) {
            label.previousElementSibling.click(); // Click the radio input before the label
          }
        });
        console.log('Selected: U.S. Government Sponsored Exchange Program');
      } else if (formData.category === 'jm') {
        // Journalist and Media
        await page.evaluate(() => {
          const label = Array.from(document.querySelectorAll('label')).find(
            (label) => label.textContent.includes('Journalist and Media'),
          );
          if (label) {
            label.previousElementSibling.click(); // Click the radio input before the label
          }
        });
        console.log('Selected: Journalist and Media');
      } else {
        console.error(`Invalid category provided: ${formData.category}`);
        return;
      }

      // Wait for the "Continue" button to appear
      const continueBtn = await page.waitForSelector(
        'input[name="j_id0:SiteTemplate:j_id166"], input[name="j_id0:SiteTemplate:j_id109:j_id166"]',
      );

      // Check if the button is enabled before clicking
      const isButtonEnabled = async (selector) => {
        const button = await page.$(selector);
        if (button) {
          const isDisabled = await button.evaluate((el) => el.disabled);
          return !isDisabled; // Return true if the button is enabled
        }
        return false; // Return false if the button does not exist
      };

      // Click the enabled button
      if (await isButtonEnabled('input[name="j_id0:SiteTemplate:j_id166"]')) {
        await page.click('input[name="j_id0:SiteTemplate:j_id166"]');
        console.log('Clicked immigrant visa category "Continue" button.');
      } else if (
        await isButtonEnabled(
          'input[name="j_id0:SiteTemplate:j_id109:j_id166"]',
        )
      ) {
        await page.click('input[name="j_id0:SiteTemplate:j_id109:j_id166"]');
        console.log('Clicked non-immigrant visa category "Continue" button.');
      } else {
        console.error('No available "Continue" button to click.');
      }

      console.log('Clicked "Continue" button.');

      // Wait for the next page to load (if applicable)
      await page.waitForNavigation({ waitUntil: 'networkidle2' });
      console.log('Navigated to the next page after selecting the category.');
    } else {
      console.error('Failed to navigate to the Visa category page.');
    }

    if (page.url().includes('selectvisacode')) {
      await page.waitForSelector('#j_id0\\:SiteTemplate\\:theForm');

      // Check the selected visa category and select the appropriate radio button
      if (formData.category === 'sb1') {
        await page.click('input[type="radio"][value="a0AC000000JRE67MAH"]');
      } else if (formData.category === 'lpr') {
        await page.click('input[type="radio"][value="a0A1A00001vmWztUAE"]');
      } else if (formData.category === 'btv') {
        await page.click('input[type="radio"][value="a0AC000000ILpJwMAL"]');
      }
      // Click the "Continue" button
      await page.click('input[name="j_id0:SiteTemplate:theForm:j_id178"]');
    } else {
      console.error('Failed to navigate to the Visa category page.');
    }
    // Wait for the tooltip to appear
    if (rateLimitError) {
      console.error('Rate limiting detected, retrying with a proxy...');

      // Close the current page to clean up resources
      await page.close();

      // Retry with a proxy
      ({ page } = await connectWithProxy());
      await page.goto('https://portal.ustraveldocs.com/updatedata');
      await page.waitForNavigation({ waitUntil: 'networkidle0' });
    } else {
      console.log('No rate limiting detected, continuing with normal flow...');
    }
    const dis = await page
      .waitForSelector('.ui-tooltip', { timeout: 3000 })
      .catch(() => null);
    if (dis) {
      console.log('found dis');
    }
    await page.waitForSelector('.ui-tooltip .generatebutton');
    // Click the "I Accept Terms And Conditions" button
    await page.click('.ui-tooltip .generatebutton');

    return true;
  } catch (error) {
    console.error('Error during booking:', error);
    return false;
  }
};

ipcMain.on('get-users', async (event) => {
  try {
    const users = await getAllUsersCookies(); // Wait for the promise to resolve

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
ipcMain.on('login-user', async (event, data) => {
  console.log('cehckdata', data);
  const cookies = await getUserCookiesByEmail(data.email);
  console.log('cehckcookies', cookies);
  performReLogin(cookies);
});
ipcMain.on('book-appoint', async (event, data) => {
  console.log('Received data:', data);

  try {
    // Fetch cookies using the provided email
    const cookies = await getUserCookiesByEmail(data.email);
    console.log('Cookies retrieved:', cookies);

    // Call the booking function with the cookies and form data
    await bookAppointment(cookies, data.formData);
  } catch (error) {
    console.error('Error in booking process:', error);
  }
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
