const admin = require("../firebase");
const db = admin.firestore();

// POST /admin/locations
exports.createLocation = async (req, res) => {
  try {
    const { name, lat, lng, radius } = req.body;

    if (!name || !lat || !lng || !radius) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await db.collection("locations").add({
      name,
      lat,
      lng,
      radius,
      enabled: true,
      createdAt: admin.firestore.Timestamp.now()
    });

    res.status(201).json({ message: "Location created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to create location", details: err.message });
  }
};

// GET /admin/locations
exports.getLocations = async (req, res) => {
  try {
    const snapshot = await db.collection("locations").get();
    const locations = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json({ locations });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch locations", details: err.message });
  }
};
