const puppeteer = require("puppeteer");
const CREDS = require("./creds");
const readlineSync = require("readline-sync");

const USERNAME_SELECTOR = "#username";
const PASSWORD_SELECTOR = "#password";
const BUTTON_SELECTOR =
  "#app__container > main > div > form > div.login__form_action_container > button";
const INVITATION_SELECTOR = ".mn-invitation-list";
const SELECT_ALL_SELECTOR = "#contact-select-checkbox";
const ACCEPT_SELECTOR = ".self-focused .ember-view > div > button:nth-child(3)";

async function run() {
  console.log("Hi, I'll accept all LinkedIn invitations on your behalf!");
  const userName = readlineSync.question("May I have your LOGIN? ");
  const userPassword = readlineSync.question(
    "Will you tell me your PASSWORD? "
  );
  const userInterval = readlineSync.question(
    "How often should I check the invitations? (minutes)"
  );
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  await page.goto("https://www.linkedin.com/login");

  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(userName);

  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(userPassword);

  await page.click(BUTTON_SELECTOR);

  await page.goto("https://www.linkedin.com/mynetwork/invitation-manager/");

  setInterval(async function() {
    try {
      await page.waitForSelector(INVITATION_SELECTOR, {
        timeout: 1000
      });
      await page.click(SELECT_ALL_SELECTOR);
      await page.click(ACCEPT_SELECTOR);
    } catch (error) {
      console.log(
        `No invitations, I'll check them again in ${userInterval} minutes`
      );
    }
  }, userInterval * 60000);

  browser.close();
}

run();
