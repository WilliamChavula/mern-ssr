import authServices from '../services/auth.services';
import userServices from '../services/user.services';

const signin = async (req, res) => {
	try {
		const { email, password } = req.body;

		/* -------Get user document with entered email-------*/
		const user = await userServices.getUserDocumentByEmail(email);

		if (!user) {
			return res.status(401).json({ error: 'User not found' });
		}

		/* -------check if password is valid by calling `authenticate` method on document-------*/
		if (!user.authenticate(password)) {
			return res.status(401).send({ error: "Email and password don't match." });
		}

		/* -------user is found and passwords match-------*/
		/* -------authenticate user and generate JWT token-------*/
		const token = authServices.createToken(user._id);
		res.cookie('t', token, { expire: Date.now() + 9999 });

		return res.json({
			token,
			user: {
				_id: user._id,
				name: user.name,
				email: user.email,
			},
		});
	} catch (error) {
		return res.status(401).json({ error: 'Could not sign in' });
	}
};

const signout = (req, res) => {
	res.clearCookie('t');

	return res.status(200).json({ message: 'signed out' });
};

const hasAuthorization = (req, res, next) => {
	const authorized =
		req.profile && req.auth && req.profile._id.toString() === req.auth._id;

	console.log({profile: req.profile,  auth: req.auth, profileId: req.profile._id.toString(), authId: req.auth._id});

	if (!authorized) {
		return res.status(403).json({
			error: 'User is not authorized',
		});
	}
	next();
};

export { signin, signout, hasAuthorization };
