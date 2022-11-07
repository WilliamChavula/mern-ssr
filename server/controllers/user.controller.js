import { extend } from 'lodash';

import User from '../models/user.model';
import getErrorMessage from '../helpers/dbErrorHandler';

const create = async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		res.status(200).json({ message: 'Successfully signed up!' });
	} catch (error) {
		return res.status(400).json({ error: getErrorMessage(error) });
	}
};

const list = async (req, res) => {
	try {
		const users = await User.find().select('name email updatedAt createdAt');
		res.json(users);
	} catch (error) {
		return res.status(400).json({ error: getErrorMessage(error) });
	}
};

const userByID = async (req, res, next, id) => {
	try {
		const user = await User.findById(id);

		if (!user) {
			return res.status(400).json({ error: 'User not found' });
		}

		req.profile = user;
		next();
	} catch (error) {
		return res.status('400').json({ error: 'Could not retrieve user' });
	}
};
const read = (req, res) => {
	req.profile.password = undefined;
	req.profile.salt = undefined;

	return res.json(req.profile);
};

const update = async (req, res) => {
	try {
		let user = req.profile;

		user = extend(user, req.body);
		await user.save();
		user.password = undefined;
		user.salt = undefined;

		res.json(user);
	} catch (error) {
		return res.status(400).json({ error: getErrorMessage(error) });
	}
};
const remove = async (req, res) => {
	try {
		const user = req.profile;

		const deletedUser = await User.findByIdAndDelete(user._id);
		deletedUser.password = undefined;
		deletedUser.salt = undefined;

		res.json(deletedUser);
	} catch (error) {
		return res.status(400).json({ error: getErrorMessage(error) });
	}
};

export { create, list, userByID, read, update, remove };
