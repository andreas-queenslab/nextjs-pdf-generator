const chrome = require("chrome-aws-lambda");
const { chromium } = require("playwright");

export default async function handler(req, res) {
  const url = req?.query?.url;
  if (!url) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ id: null }));
    return;
  }

  const browser = await chromium.launch(
    process.env.NODE_ENV === "production"
      ? {
          args: chrome.args,
          executablePath: await chrome.executablePath,
          headless: chrome.headless,
        }
      : {}
  );
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.google.com/search?q=Google");
  const pdf = await page.pdf({ path: `document.pdf` });
  await browser.close();
  return pdf;
}

