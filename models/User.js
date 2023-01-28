import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema({
	name: {
		type: String,
		reqired: [true, 'please provide name'],
	},
	email: {
		type: String,
		reqired: [true, 'please provide email'],
		validate: {
			validator: validator.isEmail,
			message: 'Please provide a valid email',
		},
		unique: true,
	},
	password: {
		type: String,
		reqired: [true, 'please provide password'],
		minlength: 6,
		select: false,
	},
	lastName: {
		type: String,
		maxlength: 10,
		default: 'seervi',
	},

	location: {
		type: String,
		maxlength: 20,
		default: 'Rajasthan, India',
	},
});

userSchema.pre('save', async function () {
	// console.log(this.modifiedPaths());

	if (!this.isModified('password')) return;
	const salt = await bcrypt.genSalt(15);
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
	return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	});
};

userSchema.methods.comparePassword = async function (PASSWORD) {
	return await bcrypt.compare(PASSWORD, this.password);
};

export default mongoose.model('User', userSchema);
