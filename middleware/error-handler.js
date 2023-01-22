import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
	// console.log('Error:', err.message);
	console.log(err);
	const defaultError = {
		StatusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || 'something went wrong',
	};

	if (err.name === 'ValidationErrors') {
		defaultError.StatusCode = StatusCodes.BAD_REQUEST;
		defaultError.msg = Object.values(err.errors)
			.map((item) => item.message)
			.join(',');
	}

	if (err.code && err.code === 11000) {
		defaultError.StatusCode = StatusCodes.BAD_REQUEST;
		defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
	}

	res.status(defaultError.StatusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
