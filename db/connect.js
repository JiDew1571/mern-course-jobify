import { config } from 'dotenv';
import mongoose from 'mongoose';
config();

const connectDB = async (uri) => {
	try {
		mongoose.set('strictQuery', false);
		await mongoose.connect(uri);
	} catch (error) {
		console.log(error);
	}
};

export default connectDB;
