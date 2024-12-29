const router = require('express').Router();
const authRouter = require('./auth');
const authenticate = require('../middleware/authenticate');
const userRouter = require('./users');
const adminAttendanceRoutes = require('./admin-attendance');
const StudentAttendanceRoutes = require('./student-attendance');

router.use('/api/v1/auth', authRouter);
router.use('/api/v1/users', authenticate, userRouter);
router.use('/api/v1/admin/attendance', authenticate, adminAttendanceRoutes);
router.use('/api/v1/student/attendance', authenticate, StudentAttendanceRoutes);

module.exports = router;