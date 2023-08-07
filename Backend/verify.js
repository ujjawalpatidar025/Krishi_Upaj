const jwt = require("jsonwebtoken");

const verifyToken = (req, resp, next) => {
  const token = req.body.token;
  /// console.log(token);
  if (!token)
    resp.status(404).json({ status: "false", message: "Token not found" });

  jwt.verify(token, process.env.JWTTOKENKEY, (err, user) => {
    if (err)
      resp.status(403).json({ status: "false", message: "Invalid Token" });
    req.user = user;
    req.token = token;
    next();
  });
};

module.exports = verifyToken;
