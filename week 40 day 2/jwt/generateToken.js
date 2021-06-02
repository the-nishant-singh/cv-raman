const jwt = require("jsonwebtoken");

const AccessToken = (userid) => {
  let token = jwt.sign({ id: userid }, process.env.ACCESS_SECRET, {
    expiresIn: "1y",
  });
  return token;
};

module.exports = { AccessToken };
