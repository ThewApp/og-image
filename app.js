import Fastify from "fastify";
import { chromium } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({
  deviceScaleFactor: 2,
  viewport: { width: 1200, height: 628 },
});

const fastify = Fastify({
  logger: true,
});

const hostnameWhitelist = ["www.thewdhanat.com"];

async function handleImage(request, reply) {
  fastify.log.info(request.headers)
  
  const urlPath = request.query.path;

  if (!urlPath || !urlPath.startsWith("/")) {
    return reply.code(400).send();
  }

  const page = await context.newPage();
  const url = `https://${this.hostname}${urlPath}`;
  reply.header("x-image-url", encodeURI(url));
  const response = await page.goto(url).catch((err) => {
    fastify.log.error(err)
    return reply.code(500).send()
  });
  if (![200, 304].includes(response.status())) {
    fastify.log.warn(response.status());
    return reply.code(404).send();
  }
  reply.header("Content-Type", "image/png");
  reply.header(
    "Cache-Control",
    "public, no-transform, s-maxage=86400, max-age=0"
  );
  reply.header("x-image-size", JSON.stringify(page.viewportSize()));
  await page.waitForTimeout(1000);
  const file = await page.screenshot();
  await page.close();
  return file;
}

hostnameWhitelist.forEach((hostname) => {
  fastify.get(`/${hostname}.png`, handleImage.bind({ hostname }));
  fastify.get(`/${hostname}/:image.png`, handleImage.bind({ hostname }));
});

fastify.setNotFoundHandler(async (request, reply) => {
  return reply.code(403).send();
});

fastify.listen({ port: 8080, host: "::" }).catch((err) => {
  fastify.log.error("Error starting server:", err);
  process.exit(1);
});
