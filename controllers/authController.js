import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/index.js';

const register = async (req, res) => {
	const { name, email, password } = req.body;

	// check for required fields
	if (!name || !email || !password) {
		throw new BadRequestError('All fields are required');
	}
	// check for duplicate email
	const userAlreadyExits = await User.findOne({ email });
	if (userAlreadyExits) {
		throw new BadRequestError('Email already exits, please try another one.');
	}

	const user = await User.create({ name, email, password });
	const token = user.createJWT();
	res.status(StatusCodes.CREATED).json({
		user: {
			email: user.email,
			name: user.name,
			lastName: user.lastName,
			location: user.location,
		},
		token,
		location: user.location,
	});
};

const login = async (req, res) => {
	res.send('login');
};

const updateUser = async (req, res) => {
	res.send('updateUser');
};

export { register, login, updateUser };
