const { getAttendanceStatus, getAttendance } = require('../controller/student-attendance');

const router = require('express').Router();

router.get('/status', getAttendanceStatus);
router.get('/:id', getAttendance);

module.exports = router;