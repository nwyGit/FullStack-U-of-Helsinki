import jwt from 'jsonwebtoken';
import config from './config.js';
import logger from './logger.js';

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method);
	logger.info('Path:  ', request.path);
	logger.info('Body:  ', request.body);
	logger.info('---');
	next();
};

// Routes not found
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

// Error handlers
const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({ error: error.message });
	} else if (error.name === 'TokenExpiredError') {
		return response.status(401).json({
			error: 'token expired',
		});
	}

	next(error);
};

// Token extractor
const tokenExtractor = (request, response, next) => {
	const authorization = request.get('Authorization');

	if (authorization && authorization.startsWith('Bearer ')) {
		request['token'] = authorization.replace('Bearer ', '');
	} else {
		request['token'] = null;
	}

	next();
};

// User extractor
const userExtractor = (request, response, next) => {
	const decodedToken = jwt.verify(request.token, config.JWT_SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' });
	}

	request['user'] = decodedToken.id;
	next();
};

export default {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor,
};
