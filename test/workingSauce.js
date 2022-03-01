const { Builder, By, Key, until } = require("selenium-webdriver");
const SauceLabs = require("saucelabs").default;
const assert = require("assert");
const utils = require("./utils");
require("dotenv").config();

const SAUCE_USERNAME = process.env.SAUCE_USERNAME;
const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY;
//const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.saucelabs.com:443/wd/hub`;
// NOTE: Use the URL below if using our EU datacenter (e.g. logged in to app.eu-central-1.saucelabs.com)
const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.eu-central-1.saucelabs.com:443/wd/hub`;
/**
 * Task I: Update the test code so when it runs, the test clicks the "I am a link" link.
 *
 * Task II - Comment out the code from Task I. Update the test code so when it runs,
 * the test is able to write "Sauce" in the text box that currently says "I have no focus".
 *
 * Task III - Update the test code so when it runs, it adds an email to the email field,
 * adds text to the comments field, and clicks the "Send" button.
 * Note that email will not actually be sent!
 *
 * Task IV - Add a capability that adds a tag to each test that is run.
 * See this page for instructions: https://docs.saucelabs.com/dev/test-configuration-options/
 *
 * Bonus: Set the status of the test so it shows as "passed" instead of "complete".
 * We've included the node-saucelabs package already. For more info see:
 * https://github.com/saucelabs/node-saucelabs
 */

describe("Working Sauce", function () {
  it("should go to Google and click Sauce", async function () {
    let driver = await new Builder()
      .withCapabilities(utils.workingCapabilities)
      .usingServer(ONDEMAND_URL)
      .build();

    /**
     * Goes to Sauce Lab's guinea-pig page and verifies the title
     */

    await driver.get("https://saucelabs.com/test/guinea-pig");
    await assert.strictEqual(
      "I am a page title - Sauce Labs",
      await driver.getTitle()
    );

    // Task I - test clicks the "I am a link" link

    /* await driver.findElement(By.id("i am a link")).click();
    await assert.strictEqual(
      "I am another page title - Sauce Labs",
      await driver.getTitle()
    );*/

    // Task II

    //It was not obvious if the test needs to be able to only write "Sauce" in the textbox or before that it has to also clear
    //"I have no focus" from the textbox

    /*await driver.findElement(By.id("i_am_a_textbox")).sendKeys("Sauce");
    await assert.strictEqual(
      "i has no focusSauce",
      await driver.findElement(By.id("i_am_a_textbox")).getAttribute("value")
    );*/

    //test is able to write "Sauce" in the text box
    const textbox = await driver.findElement(By.id("i_am_a_textbox"));
    await textbox.clear();
    await textbox.sendKeys("Sauce");
    await assert.strictEqual("Sauce", await textbox.getAttribute("value"));

    // Task III - test adds an email to the email field
    const emailbox = await driver.findElement(By.id("fbemail"));
    await emailbox.clear();
    await emailbox.sendKeys("radvannoemi@gmail.com");
    await assert.strictEqual(
      "radvannoemi@gmail.com",
      await emailbox.getAttribute("value")
    );
    //test adds comments to the comment field
    const commentbox = await driver.findElement(By.id("comments"));
    await commentbox.clear();
    await commentbox.sendKeys("This is a new comment");
    await assert.strictEqual(
      "This is a new comment",
      await commentbox.getAttribute("value")
    );
    //test clicks the send button
    await driver.findElement(By.id("submit")).click();
    await assert.strictEqual(
      "Your comments: This is a new comment",
      await driver
        .findElement(By.id("your_comments"))
        .getAttribute("textContent")
    );

    //BONUS - test status shows as "passed" instead of "complete"
    driver.executeScript(`sauce:job-result=passed`);

    await driver.quit();
  });
});
