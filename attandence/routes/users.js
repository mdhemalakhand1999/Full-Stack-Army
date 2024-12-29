const { deleteUser, getUsers, getUserByID, patchUserById, putUserById, postUser } = require('../controller/users');

const router = require('express').Router();

// get user by ID or eMail.
router.get('/:userId', getUserByID);

// Update user by ID - PATCH.
router.patch('/:userId', patchUserById);

// Update user by ID - PUT.
router.put('/:userId', putUserById);

// Create new user.
router.post('/', postUser);

// get all users.
router.get('/', getUsers)

// delete an user.
router.delete('/:userId', deleteUser);


module.exports = router;