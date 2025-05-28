const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { getLoggedInUser } = require("./lib/auth");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// generateParagonUserToken and getLoggedInUser are provided by lib/auth and
// used to mock an authenticated user for the demo.

const port = process.env.PORT ?? 3000;
app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    req.user = getLoggedInUser();
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
