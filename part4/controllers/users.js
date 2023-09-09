import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';

const usersRouter = express.Router();

// Get all users
usersRouter.get('/', async (req, res, next) => {
	try {
		const users = await User.find({}).populate('blogs');
		res.json(users);
	} catch (err) {
		next(err);
	}
});

// Create a user
usersRouter.post('/', async (req, res, next) => {
	try {
		const { username, name, password } = req.body;

		if (password.length < 3) {
			res.status(400).json({
				error: 'password length should be at least 3 characters long',
			});
		}

		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(password, saltRounds);

		const user = new User({
			username,
			name,
			passwordHash,
		});

		const savedUser = await user.save();

		res.status(201).json(savedUser);
	} catch (err) {
		next(err);
	}
});

export default usersRouter;
