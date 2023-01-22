const notFoundMiddleware = (req, res, next) => {
	res.status(404).json({ Error: 'Route not found.' });
	next();
};

export default notFoundMiddleware;
