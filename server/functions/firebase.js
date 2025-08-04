const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp();
}

module.exports = admin;

// const admin = require('firebase-admin');
// const { getFirestore } = require('firebase-admin/firestore');

// admin.initializeApp({
//   credential: admin.credential.cert(require('./serviceAccountKey.json')),
// });

// const db = getFirestore();

// module.exports = db;

