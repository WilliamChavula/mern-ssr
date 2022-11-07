import { extend } from 'lodash';

import User from '../models/user.model';

const createUserDocument = async user => {
	// const newUser = new User(user);
	// await newUser.save();
	await User.create(user);
};

const listUserDocuments = async () => {
	const users = await User.find()
		.select('name email updatedAt createdAt')
		.exec();
	return users;
};

const getUserDocument = async userId => {
	const user = await User.findById(userId).exec();
	return user;
};

const getUserDocumentByEmail = async email => {
	const user = await User.findOne({ email }).exec();

	return user;
};

const updateUserDocument = async (user, patchObject) => {
	user = extend(user, patchObject);
	await user.save();

	user.password = undefined;
	user.salt = undefined;

	return user;
};

const deleteUserDocument = async id => {
	const deletedUser = await User.findByIdAndDelete(id).exec();

	deletedUser.password = undefined;
	deletedUser.salt = undefined;

	return deletedUser;
};

export default {
	createUserDocument,
	listUserDocuments,
	getUserDocument,
	getUserDocumentByEmail,
	updateUserDocument,
	deleteUserDocument,
};
