import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';

// register
const register = async (req, res) => {
	const { name, email, password } = req.body;

	// check for required fields
	if (!name || !email || !password) {
		throw new BadRequestError('All fields are required');
	}
	// check for duplicate email
	const userAlreadyExits = await User.findOne({ email });
	if (userAlreadyExits) {
		throw new BadRequestError('email already in use.');
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

// login
const login = async (req, res) => {
	const { email, password } = req.body;

	// check for required fields
	if (!email || !password) {
		throw new BadRequestError('All values are required.');
	}

	// check for email/user exist or not
	const user = await User.findOne({ email }).select('+password');
	if (!user) {
		throw new UnauthenticatedError("Invalid credentials or user doesn't exits");
	}
	console.log(user);

	const isPasswordCorrect = await user.comparePassword(password); // compare password
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError('wrong password!');
	}

	const token = user.createJWT(); // token
	user.password = undefined; // to not send password with response
	res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

// update user
const updateUser = async (req, res) => {
	res.send('updateUser');
};

export { register, login, updateUser };
