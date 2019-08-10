const puppeteer = require("puppeteer");
const CREDS = require("./creds");

const USERNAME_SELECTOR = "#username";
const PASSWORD_SELECTOR = "#password";
const BUTTON_SELECTOR =
  "#app__container > main > div > form > div.login__form_action_container > button";
const INVITATION_SELECTOR = ".mn-invitation-list";

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
    console.log("The element appeared.");
  } catch (error) {
    console.log("The element didn't appear.");
  }

  browser.close();
}

run();
