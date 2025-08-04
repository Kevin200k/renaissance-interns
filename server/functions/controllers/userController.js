const admin = require("firebase-admin");

// Set user role
exports.setUserRole = async (req, res) => {
  try {
    const { uid, role } = req.body;
    if (!uid || !role) return res.status(400).send("Missing fields");

    await admin.firestore().collection("users").doc(uid).update({ role });
    await admin.auth().setCustomUserClaims(uid, { role });

    res.send({ success: true, message: "User role updated" });
  } catch (error) {
    console.error("Error setting user role:", error);
    res.status(500).send("Internal server error");
  }
};

// Get all users (with optional search and attendance filter)
exports.getAllUsers = async (req, res) => {
  try {
    let snapshot = await admin.firestore().collection("users").get();
    let users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const { search = "", attendance } = req.query;

    if (search) {
      const lowerSearch = search.toLowerCase();
      users = users.filter(user =>
        user.fullName?.toLowerCase().includes(lowerSearch) ||
        user.email?.toLowerCase().includes(lowerSearch)
      );
    }

    if (attendance) {
      users = users.filter(user => {
        const att = user.attendancePercentage ?? 0;
        if (attendance === "high") return att > 80;
        if (attendance === "medium") return att >= 50 && att <= 80;
        if (attendance === "low") return att < 50;
        return true;
      });
    }

    res.send(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).send("Internal server error");
  }
};
// exports.getAllUsers = async (req, res) => {
//   try {
//     // Dummy data for now (Replace with Firestore logic later)
//     const users = [
//       { id: 1, fullName: 'John Doe', email: 'john@example.com', attendancePercentage: 85, avatar: 'https://via.placeholder.com/100', presence: 'Present' },
//       { id: 2, fullName: 'Jane Smith', email: 'jane@example.com', attendancePercentage: 70, avatar: 'https://via.placeholder.com/100', presence: 'Absent' }
//     ];
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error', error: error.message });
//   }
// };

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const uid = req.params.id;
    const userDoc = await admin.firestore().collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send({ id: userDoc.id, ...userDoc.data() });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).send("Internal server error");
  }
};

// Suspend user
exports.suspendUser = async (req, res) => {
  try {
    const uid = req.params.id;
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).send({ error: "Suspension reason required" });
    }

    await admin.firestore().collection("users").doc(uid).update({
      suspended: true,
      suspensionReason: reason,
      suspensionDate: new Date().toISOString(),
    });

    await admin.auth().updateUser(uid, { disabled: true });

    res.send({ success: true, message: "User suspended" });
  } catch (error) {
    console.error("Error suspending user:", error);
    res.status(500).send("Internal server error");
  }
};
