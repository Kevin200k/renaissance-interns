const admin = require("firebase-admin");

exports.verifyAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send("Missing auth header");

  const token = authHeader.replace("Bearer ", "");
  const decoded = await admin.auth().verifyIdToken(token);

  if (decoded.role !== "admin") return res.status(403).send("Not authorized");
  req.user = decoded;
  next();
};
