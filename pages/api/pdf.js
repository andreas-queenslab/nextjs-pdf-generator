const puppeteer = require("puppeteer-core");
const chrome = require("chrome-aws-lambda");

export default async function handler(req, res) {
  const url = req?.query?.url;
  if (!url) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ id: null }));
    return;
  }

  const browser = await puppeteer.launch(
    process.env.NODE_ENV === "production"
      ? {
          args: chrome.args,
          executablePath: await chrome.executablePath,
          headless: chrome.headless,
        }
      : {}
  );

  const page = await browser.newPage();
  page.setUserAgent(
    "Opera/9.80 (J2ME/MIDP; Opera Mini/5.1.21214/28.2725; U; ru) Presto/2.8.119 Version/11.10"
  );
  await page.goto(url);
  const pdf = await page.pdf({ format: "a4" });
  return pdf;
}

