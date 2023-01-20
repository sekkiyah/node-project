const User = require('../models/User');

const getUsers = async (req, res, next) => {
	try {
		const result = await User.find();

		res.status(200).setHeader('Content-Type', 'application/json').json(result);
	} catch (err) {
		throw new Error(`Error getting all users: ${err.message}`);
	}
};

const createUser = async (req, res, next) => {
	try {
		const result = await User.create(req.body);

		res.status(200).setHeader('Content-Type', 'application/json').json(result);
	} catch (err) {
		throw new Error(`Error creating a user: ${err.message}`);
	}
};

// const deleteUser = async (req, res, next) => {

// }

// const getUser = async (req, res, next) => {

// }

module.exports = {
	getUsers,
	createUser,
};
