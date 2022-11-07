import getErrorMessage from '../helpers/dbErrorHandler';
import userServices from '../services/user.services';

const create = async (req, res) => {
	try {
		await userServices.createUserDocument(req.body);

		res.status(200).json({ message: 'Successfully signed up!' });
	} catch (error) {
		return res.status(400).json({ error: getErrorMessage(error) });
	}
};

const list = async (req, res) => {
	try {
		const users = await userServices.listUserDocuments();
		res.json(users);
	} catch (error) {
		return res.status(400).json({ error: getErrorMessage(error) });
	}
};

const userByID = async (req, res, next, id) => {
	try {
		const user = await userServices.getUserDocument(id);

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
		user = await userServices.updateUserDocument(user, req.body);

		res.json(user);
	} catch (error) {
		return res.status(400).json({ error: getErrorMessage(error) });
	}
};

const remove = async (req, res) => {
	try {
		const user = req.profile;

		const deletedUser = await userServices.deleteUserDocument(user._id);

		res.json(deletedUser);
	} catch (error) {
		return res.status(400).json({ error: getErrorMessage(error) });
	}
};

export { create, list, userByID, read, update, remove };
