var jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  // check for token in Authorization header
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    // if present, verify token
    const token = authHeader.replace("Bearer ", "");

    const valid = jwt.verify(token, "mySecretKey");
    // if valid, go to the next middleware
    if (valid) {
      next();
    } else {
      return res.status(401).send("Unauthorized request");
    }
  } else {
    return res.status(401).send("Unauthorized request");
  }
};

module.exports = verifyAuth;
