const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");

    req.user = decoded;

    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};