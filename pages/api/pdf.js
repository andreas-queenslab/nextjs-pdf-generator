const playwright = require("playwright");

export default async function handler(req, res) {
  const url = req?.query?.url;
  if (!url) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ id: null }));
    return;
  }

  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.google.com/search?q=Google");
  const pdf = await page.pdf({ path: `document.pdf` });
  await browser.close();
  return pdf;

  // const browser = await chrome.puppeteer.launch(
  //   process.env.NODE_ENV === "production"
  //     ? {
  //         args: chrome.args,
  //         executablePath: await chrome.executablePath,
  //         headless: chrome.headless,
  //       }
  //     : {}
  // );

  // const page = await browser.newPage();
  // page.setUserAgent(
  //   "Opera/9.80 (J2ME/MIDP; Opera Mini/5.1.21214/28.2725; U; ru) Presto/2.8.119 Version/11.10"
  // );
  // await page.goto(url);
  // //const pdf = await page.pdf({ format: "a4" });
  // //return pdf;
  // res.statusCode = 200;
  // res.setHeader("Content-Type", "application/json");
  // res.end(JSON.stringify({ status: "OK" }));
  // return;
}

