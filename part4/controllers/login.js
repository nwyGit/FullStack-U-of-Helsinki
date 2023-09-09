import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import config from '../utils/config.js';
import { User } from '../models/User.js';

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
	const { username, password } = req.body;

	const user = await User.findOne({ username });
	const passwordCorrect =
		user === null ? false : await bcrypt.compare(password, user.passwordHash);

	if (!(user && passwordCorrect)) {
		return res.status(401).json({ error: 'invalid username or password' });
	}

	const userForToken = { username: user.username, id: user._id };

	const token = jwt.sign(userForToken, config.JWT_SECRET, {
		expiresIn: 60 * 60,
	});

	res.status(200).send({ token, username: username, name: user.name });
});

export default loginRouter;
