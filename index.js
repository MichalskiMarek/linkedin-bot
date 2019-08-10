const puppeteer = require("puppeteer");
const CREDS = require("./creds");

const USERNAME_SELECTOR = "#username";
const PASSWORD_SELECTOR = "#password";
const BUTTON_SELECTOR =
  "#app__container > main > div > form > div.login__form_action_container > button";
const INVITATION_SELECTOR = ".mn-invitation-list";
const SELECT_ALL_SELECTOR = "#contact-select-checkbox";
const ACCEPT_SELECTOR = ".self-focused .ember-view > div > button:nth-child(3)";

async function run() {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  await page.goto("https://www.linkedin.com/login");

  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(CREDS.username);

  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(CREDS.password);

  await page.click(BUTTON_SELECTOR);
  await page.goto("https://www.linkedin.com/mynetwork/invitation-manager/");

  try {
    await page.waitForSelector(INVITATION_SELECTOR, {
      timeout: 1000
    });
    await page.click(SELECT_ALL_SELECTOR);
    //await page.click(ACCEPT_SELECTOR);
  } catch (error) {
    console.log("The element didn't appear.");
  }

  browser.close();
}

run();
