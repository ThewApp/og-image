import express from "express";
import { chromium } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({
  deviceScaleFactor: 2.5,
  viewport: { width: 1200, height: 628 },
});

const app = express();
const port = 8080;

const siteWhitelist = ["www.thewdhanat.com"];

app.get("/:site", async (req, res) => {
  const urlPath = req.query.path;
  const site = req.params.site;
  if (!siteWhitelist.includes(site) || !urlPath || !urlPath.startsWith("/")) {
    return res.status(403).end();
  }
  const page = await context.newPage();
  const url = `https://${site}${urlPath}`;
  const response = await page.goto(url).catch(() => {});
  if (!response || ![200, 304].includes(response.status())) {
    console.warn(Date(), response.status());
    return res.status(404).end();
  }
  res.setHeader("Content-Type", `image/png`);
  res.setHeader(
    "Cache-Control",
    `public, no-transform, s-maxage=86400, max-age=0`
  );
  res.setHeader("x-size", JSON.stringify(page.viewportSize()));
  const file = await page.screenshot();
  await page.close();
  console.log(Date(), url);
  return res.end(file);
});

app.all("/*", (req, res) => {
  res.status(400).end();
});

app.listen(port, () => {
  console.log(`og-image app listening at http://localhost:${port}`);
});
