const admin = require("../firebase");
const logger = require("firebase-functions/logger");
const db = admin.firestore();

exports.markAttendance = async (req, res) => {
  const { lat, lng } = req.body;
  const user = req.user;

  logger.info(`User ${user.uid} attempting to mark attendance`, { lat, lng });

  try {
    const snapshot = await db.collection("locations").where("enabled", "==", true).get();
    let withinRange = false;

    snapshot.forEach(doc => {
      const location = doc.data();
      const distance = getDistanceFromLatLonInMeters(lat, lng, location.lat, location.lng);
      if (distance <= location.radius) {
        withinRange = true;
        logger.info(`User ${user.uid} is within range of location ${doc.id}`);
      }
    });

    if (!withinRange) {
      logger.warn(`User ${user.uid} is NOT within any attendance zone`);

      // Save flagged attendance for review
      await db.collection("flagged_attendance").add({
        userId: user.uid,
        timestamp: admin.firestore.Timestamp.now(),
        lat,
        lng,
        status: "Unreviewed",
        issue: "Outside allowed location"
      });

      return res.status(400).json({ error: "You are not within any valid attendance zone." });
    }

    await db.collection("attendance").add({
      userId: user.uid,
      timestamp: admin.firestore.Timestamp.now(),
      lat,
      lng,
      status: "present"
    });

    logger.info(`Attendance marked for user ${user.uid}`);
    res.json({ message: "Attendance marked." });
  } catch (err) {
    logger.error("Error marking attendance", { error: err.message });
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};

function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = deg => deg * (Math.PI / 180);
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
