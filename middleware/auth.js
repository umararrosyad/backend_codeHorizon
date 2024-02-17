const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    throw { name: "missAuth" };
  }

  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, "codehorizon");
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "invalid token",
      data: {}
    });
  }
}

module.exports = auth;
