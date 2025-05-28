const jsonwebtoken = require("jsonwebtoken");

function generateParagonUserToken(userId) {
  const createdAt = Math.floor(Date.now() / 1000);
  return jsonwebtoken.sign(
    {
      sub: userId,
      iat: createdAt,
      exp: createdAt + 60 * 60,
    },
    process.env.PARAGON_SIGNING_KEY,
    { algorithm: "RS256" },
  );
}

function getLoggedInUser() {
  const user = {
    id: "1f45e694-977a-474c-b630-da5c7839ad94",
    name: "Sean Victory",
  };
  user.paragonUserToken = generateParagonUserToken(user.id);
  return user;
}

module.exports = { generateParagonUserToken, getLoggedInUser };
