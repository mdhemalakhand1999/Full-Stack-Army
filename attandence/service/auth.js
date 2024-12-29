const User = require("../models/User");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { createNewUser, findUserByProperty } = require("./user");
const error = require('../utils/error');

const registerService = async ({
    name,
	email,
	password,
	roles,
	accountStatus,
}) => {
    let user = await findUserByProperty('email', email);

    console.log(user);
    if( user ) {
        throw error('User already exists', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log(hash);
    return createNewUser({name, email, password: hash, roles, accountStatus});
}

const loginService = async({email, password}) => {
    const user = await findUserByProperty('email', email);

    if( !user ) {
        throw error('User not found', 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if( !isMatch ) {
        throw error('Invalid credentials', 400);
    }

    const payload = {
		_id: user._id,
		name: user.name,
		email: user.email,
		roles: user.roles,
		accountStatus: user.accountStatus,
	};

    return jwt.sign(payload, 'secret-key', {expiresIn: '2h'});
}


module.exports = {
    registerService,
    loginService
}