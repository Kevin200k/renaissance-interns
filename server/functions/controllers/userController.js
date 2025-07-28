const admin = require("firebase-admin");

exports.setUserRole = async (req, res) => {
  const { uid, role } = req.body;
  if (!uid || !role) return res.status(400).send("Missing fields");

  await admin.firestore().collection("users").doc(uid).update({ role });
  await admin.auth().setCustomUserClaims(uid, { role });

  res.send({ success: true });
};

exports.getAllUsers = async (req, res) => {
  const snapshot = await admin.firestore().collection("users").get();
  const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.send(users);
};
