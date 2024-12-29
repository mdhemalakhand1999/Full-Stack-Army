const { getEnable, getDisabled, getStatus } = require('../controller/admin-attendance');

const router = require('express').Router();

router.get('/enable', getEnable );
router.get('/disable', getDisabled );
router.get('/status', getStatus );

module.exports = router