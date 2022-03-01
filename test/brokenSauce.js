const { Builder, By, Key, until } = require("selenium-webdriver");
const utils = require("./utils");
require("dotenv").config();

const SAUCE_USERNAME = process.env.SAUCE_USERNAME;
const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY;
//const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.us-west-1.saucelabs.com:443/wd/hub`;
// NOTE: Use the URL below if using our EU datacenter (e.g. logged in to app.eu-central-1.saucelabs.com)
const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.eu-central-1.saucelabs.com:443/wd/hub`;

/**
 * Run this test before working on the problem.
 * When you view the results on your dashboard, you'll see that the test "Failed".
 * Your job is to figure out why the test failed and make the changes necessary to make the test pass.
 *
 * Bonus: Once you get the test working, update the code so that when the test runs, it
 * can reach the Sauce Labs homepage
 * hover over 'Resources' and then clicks the 'Documentation' link
 */

describe("Broken Sauce", function () {
  it("should go to Google and click Sauce", async function () {
    let driver = await new Builder()
      .withCapabilities(utils.brokenCapabilities)
      .usingServer(ONDEMAND_URL)
      .build();

    await driver.get("https://www.google.com");
    // If you see a German or English GDPR modal on google.com you
    // will have to code around that or use the us-west-1 datacenter.
    // You can investigate the modal elements using a Live Test(https://app.saucelabs.com/live/web-testing)

    //Got a German GDPR modal on google.com
    //clicks "Ich stimme zu (meaning: I agree)" button
    await driver.findElement(By.xpath("//*[text()='Ich stimme zu']")).click();

    //correction of name attribute(Previously was "Search", corrected to "q")
    //able to write "Sauce Labs" in Google Search bar
    let search = await driver.findElement(By.name("q"));
    await search.sendKeys("Sauce Labs");

    //clicks
    let button = await driver.findElement(By.name("btnK"));
    await button.click();

    //BONUS:

    //test is able to find the correct link to click, to reach https://saucelabs.com
    //instead of other listed links
    let page = await driver.findElement(
      By.partialLinkText("https://saucelabs.com")
    );
    await page.click();

    //getting "Resources" elements
    let resource = await driver.findElements(
      By.css("div[data-hover-content='Resources']")
    );

    //getting the second "Resources" element (first one is in the hamburger menu)
    resource = resource[1];

    //some logs to see what is selected
    console.log(await resource.getAttribute("innerHTML"));
    console.log(await resource.getRect());

    const action = driver.actions();

    //hover to the resource element
    await action.move({ origin: resource }).perform();

    //find the "Documentation" link and click it
    const docs = driver.findElement(By.linkText("Documentation"));
    console.log(await docs.getAttribute("innerHTML"));
    await docs.click();

    //test status shows as "passed" instead of "complete"
    driver.executeScript(`sauce:job-result=passed`);

    await driver.quit();
  });
});
