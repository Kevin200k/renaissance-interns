const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');

admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccountKey.json')),
});

const db = getFirestore();

// Seed Logic Here
(async () => {
  try {
    const batch = db.batch();

    const locations = [
      { name: 'Main Campus', lat: 6.5244, lng: 3.3792, radius: 100, enabled: true },
      { name: 'Annex Building', lat: 6.6000, lng: 3.3500, radius: 80, enabled: true },
      { name: 'Tech Hub', lat: 6.5500, lng: 3.4000, radius: 50, enabled: true },
    ];

    locations.forEach((location) => {
      const docRef = db.collection('locations').doc();
      batch.set(docRef, {
        ...location,
        createdAt: admin.firestore.Timestamp.now(),
      });
    });

    await batch.commit();
    console.log('✅ Successfully seeded locations');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding locations:', err);
    process.exit(1);
  }
})();
