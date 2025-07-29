const admin = require("../firebase");
const logger = require("firebase-functions/logger");

exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    logger.warn("Missing auth header");
    return res.status(401).send("Missing auth header");
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    logger.info(`Verified user ${decoded.uid}`);
    next();
  } catch (error) {
    logger.error("Token verification failed", { error: error.message });
    res.status(401).send("Unauthorized");
  }
};
