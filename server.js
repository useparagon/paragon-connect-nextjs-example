const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const jsonwebtoken = require("jsonwebtoken");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Generate a Paragon User Token with a JWT library, using a user ID and the
// Paragon Signing Key (stored in environment variables).
function generateParagonUserToken(userId) {
  const createdAt = Math.floor(Date.now() / 1000);
  return jsonwebtoken.sign(
    {
      sub: userId,
      iat: createdAt,
      exp: createdAt + 60 * 60,
    },
    process.env.PARAGON_SIGNING_KEY,
    { algorithm: "RS256" }
  );
}

// This function might use a session identifier to find a logged-in user and
// return their user details. Here, we use a static value for the demo.
function getLoggedInUser() {
  const user = {
    id: "1f45e694-977a-474c-b630-da5c7839ad94",
    name: "Sean Victory",
  };
  user.paragonUserToken = generateParagonUserToken(user.id);
  return user;
}

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
