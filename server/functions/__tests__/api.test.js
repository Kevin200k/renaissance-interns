const request = require('supertest');
const app = require('../index'); // Your main Express app

// ----- MOCK MIDDLEWARES -----
jest.mock('../middlewares/verifyToken', () => ({
  verifyToken: (req, res, next) => next(),
  verifyAdmin: (req, res, next) => next(),
}));
jest.mock('../middlewares/verifyAdmin', () => ({
  verifyAdmin: (req, res, next) => next(),
}));
jest.mock('../middlewares/auth', () => ({
  verifyAdmin: (req, res, next) => next(),
}));

// ----- MOCK CONTROLLERS -----
jest.mock('../controllers/adminController', () => ({
  createLocation: (req, res) => res.status(201).json({ message: 'Location created' }),
  getLocations: (req, res) => res.status(200).json({ locations: [] }),
}));
jest.mock('../controllers/attendanceController', () => ({
  markAttendance: (req, res) => res.status(200).json({ message: 'Attendance marked' }),
  getHistory: (req, res) => res.status(200).json({ history: [] }),
}));
jest.mock('../controllers/userController', () => ({
  setUserRole: jest.fn((req, res) => res.status(200).json({ message: 'Role updated' })),
  getAllUsers: jest.fn((req, res) => res.status(200).json({ users: [] })),
  getUserById: jest.fn((req, res) => res.status(200).json({ id: 'user123', fullName: 'Test User' })),
  suspendUser: jest.fn((req, res) => res.status(200).json({ message: 'User suspended' })),
}));

jest.mock('../controllers/flaggedController', () => ({
  getFlaggedAttendance: (req, res) => res.status(200).json([{ id: '1', status: 'Unreviewed' }]),
  markReviewed: (req, res) => res.status(200).json({ message: 'Flagged attendance marked as reviewed' }),
  markIgnored: (req, res) => res.status(200).json({ message: 'Flagged attendance marked as ignored' }),
}));
jest.mock('../controllers/flaggedUserController', () => ({
  getFlaggedUsers: (req, res) => res.status(200).json([{ id: 'user123', reason: 'Test Reason' }]),
  flagUser: (req, res) => res.status(201).json({ message: 'User flagged successfully' }),
  unflagUser: (req, res) => res.status(200).json({ message: 'User unflagged successfully' }),
}));

// -------------------------
//        TEST SUITE
// -------------------------
describe('API Integration Tests', () => {
  // Health Check
  it('should return health check message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('✅ Attendance API is working!');
  });

  // Admin APIs
  it('should create location', async () => {
    const res = await request(app)
      .post('/admin/locations')
      .send({ name: 'Main HQ', address: '123 Main Street' });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Location created');
  });

  it('should get locations', async () => {
    const res = await request(app).get('/admin/locations');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.locations)).toBe(true);
  });

  // Attendance APIs
  it('should mark attendance', async () => {
    const res = await request(app)
      .post('/attendance/mark')
      .send({ userId: 'user123' });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Attendance marked');
  });

  // User APIs
  it('should set user role', async () => {
    const res = await request(app)
      .post('/users/set-role')
      .send({ uid: 'user123', role: 'admin' });  // <== Changed here to uid
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Role updated');
  });

  it('should get all users', async () => {
    const res = await request(app).get('/users/');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.users)).toBe(true);
  });

  // Flagged Attendance APIs
  describe('Flagged Attendance', () => {
    it('should fetch flagged attendance', async () => {
      const res = await request(app).get('/flagged-attendance');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0]).toHaveProperty('status');
    });

    it('should mark a flagged attendance as reviewed', async () => {
      const res = await request(app).post('/flagged-attendance/1/review');
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Flagged attendance marked as reviewed');
    });

    it('should mark a flagged attendance as ignored', async () => {
      const res = await request(app).post('/flagged-attendance/1/ignore');
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Flagged attendance marked as ignored');
    });
  });

  // Flagged Users APIs
  describe('Flagged Users', () => {
    it('should fetch flagged users', async () => {
      const res = await request(app).get('/flagged-users');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0]).toHaveProperty('reason');
    });

    it('should flag a user', async () => {
      const res = await request(app)
        .post('/flagged-users')
        .send({ userId: 'user123', reason: 'Suspicious Activity' });
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('User flagged successfully');
    });

    it('should unflag a user', async () => {
      const res = await request(app).delete('/flagged-users/user123');
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('User unflagged successfully');
    });
  });
});
