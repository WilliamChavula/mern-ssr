import { expressjwt } from 'express-jwt';
import jwt from 'jsonwebtoken';

import config from '../../config';

const createToken = userId => {
	const token = jwt.sign({ _id: userId }, config.jwtSecret);

	return token;
};

const requireSignin = expressjwt({
	secret: config.jwtSecret,
	algorithms: ['HS256'],
});

export default { createToken, requireSignin };
