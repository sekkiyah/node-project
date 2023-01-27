const User = require('../models/User');

const getUsers = async (req, res, next) => {
	try {
		// Query parameter
		const filter = {};
		const options = {};

		// Check if the req query is empty
		if (Object.keys(req.query).length) {
			const { sortByFirstName, limit } = req.query;

			// Set up pagination
			if (limit) options.limit = limit;

			if (sortByFirstName)
				options.sort = {
					firstName: sortByFirstName === 'asc' ? 1 : -1,
				};
		}

		const result = await User.find({}, {}, options);

		res.status(200).setHeader('Content-Type', 'application/json').json(result);
	} catch (err) {
		throw new Error(`Error getting all users: ${err.message}`);
	}
};

const createUser = async (req, res, next) => {
	try {
		const user = await User.create(req.body);
		const token = user.getSignedJwtToken();

		const options = {
			expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 1000 * 60),
		};

		res
			.status(200)
			.setHeader('Content-Type', 'application/json')
			.cookie('token', token, options)
			.json({ success: true, token, user });
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
