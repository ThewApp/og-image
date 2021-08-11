import fastify from "fastify";
import { chromium } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({
  deviceScaleFactor: 2.5,
  viewport: { width: 1200, height: 628 },
});

await context.route(/\.avif$/, (route) => {
  const url = route.request().url();
  route.continue({ url: url.substr(0, url.length - 5) + ".webp" });
});

const app = fastify({
  logger: true,
});

const siteWhitelist = ["www.thewdhanat.com"];

async function handleImage(request, reply) {
  const urlPath = request.query.path;

  if (!urlPath || !urlPath.startsWith("/")) {
    return reply.code(400).send();
  }

  const page = await context.newPage();
  const url = `https://${this.site}${urlPath}`;
  reply.header("x-image-url", url);
  const response = await page.goto(url).catch(() => {});
  if (!response || ![200, 304].includes(response.status())) {
    app.log.warn(response.status());
    return reply.code(404).send();
  }
  reply.header("Content-Type", "image/png");
  reply.header(
    "Cache-Control",
    "public, no-transform, s-maxage=86400, max-age=0"
  );
  reply.header("x-image-size", JSON.stringify(page.viewportSize()));
  const file = await page.screenshot();
  await page.close();
  return file;
}

siteWhitelist.forEach((site) => {
  app.get(`/${site}.png`, handleImage.bind({ site }));
  app.get(`/${site}/:image.png`, handleImage.bind({ site }));
});

app.setNotFoundHandler(async (request, reply) => {
  return reply.code(403).send();
});

app.listen(8080, "0.0.0.0").catch((err) => {
  app.log.error("Error starting server:", err);
  process.exit(1);
});
