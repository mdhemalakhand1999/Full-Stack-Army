const AdminAttendance = require("../models/AdminAttendance");
const StudentAttendance = require('../models/StudentAttendance');
const error = require("../utils/error");
const {addMinutes, isAfter} = require('date-fns')

const getAttendanceStatus = async (_req, res, next) => {
    try {
        const running = await AdminAttendance.findOne({status: 'RUNNING'});

        if( !running ) {
            throw error('Not Running', 400);
        }
        
        const started = addMinutes(new Date(running.createdAt), running.timeLimit);

        if (isAfter(new Date(), started)) {
			running.status = 'COMPLETED';
			await running.save();
		}

        return res.status(200).json(running);
    } catch(e) {
        next(e);
    }
}

const getAttendance = async (req, res, next) => {
    const { id } = req.params;
    try {
        /**
         * Step 01 - Find adminAttendence by ID.
         * Step 02 - Check if it is running or not.
         * Step 03 - Check already registered or not.
         * Step 04 - Register entry.
         */

        const adminAttendence = await AdminAttendance.findById(id);
        if( !adminAttendence ) {
            throw error( 'Invalid Attendence ID', 400 );
        }
        if( adminAttendence.status === 'COMPLETED' ) {
            throw error( 'Attendence already completed', 40);
        }

        let attendence = await StudentAttendance.findOne({
            adminAttendence: id,
            user: req.user._id
        });

        if( attendence ) {
            throw error( 'Already registered', 400 );
        }

        attendence = new StudentAttendance({
            user: req.user._id,
            adminAttendance: id
        });

        await attendence.save();

        res.status(201).json(attendence);
    } catch(e) {
        next(e);
    }
}

module.exports = {
    getAttendanceStatus,
    getAttendance
}