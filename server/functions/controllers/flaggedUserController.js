const admin = require("../firebase");
const logger = require("firebase-functions/logger");
const db = admin.firestore();

const COLLECTION = "flagged_users";

// Get All Flagged Users
exports.getFlaggedUsers = async (req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION).get();
    const flaggedUsers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(flaggedUsers);
  } catch (error) {
    logger.error("Error fetching flagged users", { error: error.message });
    res.status(500).json({ error: "Failed to fetch flagged users" });
  }
};

// Flag a User
exports.flagUser = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection(COLLECTION).doc(id).set({
      flaggedAt: new Date(),
      status: "Flagged"
    });
    res.status(200).json({ message: "User flagged successfully" });
  } catch (error) {
    logger.error("Error flagging user", { error: error.message });
    res.status(500).json({ error: "Failed to flag user" });
  }
};

// Unflag a User
exports.unflagUser = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection(COLLECTION).doc(id).delete();
    res.status(200).json({ message: "User unflagged successfully" });
  } catch (error) {
    logger.error("Error unflagging user", { error: error.message });
    res.status(500).json({ error: "Failed to unflag user" });
  }
};
