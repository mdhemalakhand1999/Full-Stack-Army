const { registerService } = require("../service/auth");
const { findUsers, findUserByProperty, updateUser } = require("../service/user")
const {error} = require('../utils/error');

// get all users.
const getUsers = async (req, res, next) => {
    try {
        const users = await findUsers();

        return res.status(200).json(users);
    } catch(e) {
        next(e);
    }
}

const postUser = async (req, res, next) => {
    const { name, email, password, roles, accountStatus } = req.body;

    try {
        const user = registerService({name, email, password, roles, accountStatus});

        return res.status(201).json(user);
    } catch(e) {
        next(e);
    }
}

// get user by ID.
const getUserByID = async (req, res, next) => {
    const {userId} = req.params;
    try {
        const user = await findUserByProperty('_id', userId);

        if( !user ) {
            throw error('User not found', 404);
        }

        return res.status(200).json(user);
    } catch(e) {
        next(e);
    }
}

// Delete user.
const deleteUser = async (req, res, next) => {
    const { userId } = req.params;

    try {
        const user = await findUserByProperty('_id', userId);

        console.log(user);
        if( !user ) {
            throw error("User not found", 404);
        }

        await user.deleteOne();
        return res.status(203).send();
    } catch(e) {
        next(e);
    }
}

// Update user by ID - PUT.
const putUserById = async (req, res, next) => {
    const {userId} = req.params;

    const {name, email, roles, accountStatus} = req.body;

    try {
        const user = await updateUser(userId, {name, email, roles, accountStatus});

        if( !user ) {
            throw error('User not found', 400);
        }

        return res.status(200).json(user);
    } catch(e) {
        next(e);
    }

}

// patch update user by ID.
const patchUserById = async(req, res, next) => {
    const {userId} = req.params;

    const {name, roles, accountStatus} = req.body;

    try {
        const user = await findUserByProperty('_id', userId);

        if( !user ) {
            throw error('User not found', 404);
        }
        

        user.name = name ?? user.name;
        user.roles = roles ?? user.roles;
        user.accountStatus = accountStatus ?? user.accountStatus;

        await user.save();

        return res.status(200).json(user);
    } catch(e) {
        next(e)
    }
}

module.exports = {
    getUsers,
    getUserByID,
    patchUserById,
    putUserById,
    postUser,
    deleteUser
}