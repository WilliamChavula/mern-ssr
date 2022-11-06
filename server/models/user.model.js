import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: 'Name cannot be blank. It is required',
		},
		email: {
			type: String,
			trim: true,
			unique: 'An account with this email already exists',
			required: 'Email is a required field',
			match: [
				/^[a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/,
				'Please enter a valid email address',
			],
		},
		password: {
			type: String,
			required: 'Password is a required field',
			minLength: 6,
		},
		salt: String,
	},
	{ timestamps: true }
);

UserSchema.pre('save', async function (next) {
	const user = this;

	if (this.isModified('password') || this.isNew) {
		if (user.password.length < 5) {
			user.invalidate(
				'password',
				'Password must contain at least 5 characters'
			);
		}
		try {
			user.salt = await bcrypt.genSalt(16);
			const hash = await bcrypt.hash(user.password, user.salt);
			user.password = hash;
			next();
		} catch (err) {
			return next(err);
		}
	} else {
		return next();
	}
});

UserSchema.methods.authenticate = async function (password) {
	try {
		const isMatch = await bcrypt.compare(password, this.password);
		return isMatch;
	} catch (err) {
		throw new Error(err);
	}
};

export default mongoose.model('User', UserSchema);
