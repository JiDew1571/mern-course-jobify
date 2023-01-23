import express from 'express';
const app = express();
import 'express-async-errors';
import 'colors';
import dotenv from 'dotenv';
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import connectDB from './db/connect.js';
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';
import morgan from 'morgan';

dotenv.config();

if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;

const start = async () => {
	try {
		await connectDB(uri);
		app.listen(port, () => {
			console.log(`Server is listening on  http://localhost:${port}`);
			console.log('');
			console.table('available routes:');
			console.log('1.', `http://localhost:${port}/api/v1/auth/`.bgMagenta);

			console.table('auth routes:');
			console.log(`http://localhost:${port}/api/v1/auth/register/`.bgMagenta);
			console.log(`http://localhost:${port}/api/v1/auth/login/`.bgMagenta);
			console.log(`http://localhost:${port}/api/v1/auth/updateUser/`.bgMagenta);
			console.log('');
			console.log('2.', `http://localhost:${port}/api/v1/jobs/`.bgCyan);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
