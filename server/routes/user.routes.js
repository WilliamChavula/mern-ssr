import express from 'express';
import {
	create,
	read,
	list,
	update,
	remove,
	userByID,
} from '../controllers/user.controller';

import { hasAuthorization } from '../controllers/auth.controller';
import authServices from '../services/auth.services';

const router = express.Router();

/* -------USER ROUTES-------*/
router.route('/api/users').get(list).post(create);
router
	.route('/api/users/:userId')
	.get(authServices.requireSignin, read)
	.put(authServices.requireSignin, hasAuthorization, update)
	.delete(authServices.requireSignin, hasAuthorization, remove);

router.param('userId', userByID);

export default router;
