const admin = require("../firebase");
const logger = require("firebase-functions/logger");
const db = admin.firestore();

const COLLECTION = "flagged_attendance";

exports.getFlaggedAttendance = async (req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION).get();
    const flagged = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(flagged);
  } catch (error) {
    logger.error("Error fetching flagged attendance", { error: error.message });
    res.status(500).json({ error: "Failed to fetch flagged attendance" });
  }
};

exports.markReviewed = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection(COLLECTION).doc(id).update({ status: "Reviewed" });
    res.status(200).json({ message: "Flagged attendance marked as reviewed" });
  } catch (error) {
    logger.error("Error updating flagged attendance", { error: error.message });
    res.status(500).json({ error: "Failed to update flagged attendance" });
  }
};

exports.markIgnored = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection(COLLECTION).doc(id).update({ status: "Ignored" });
    res.status(200).json({ message: "Flagged attendance marked as ignored" });
  } catch (error) {
    logger.error("Error updating flagged attendance", { error: error.message });
    res.status(500).json({ error: "Failed to update flagged attendance" });
  }
};
