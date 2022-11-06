import express from 'express';
import {
	create,
	read,
	list,
	update,
	remove,
} from '../controllers/user.controller';

const router = express.Router();

/* -------USER ROUTES-------*/
router.route('/api/user').get(list).post(create);
router.route('/api/users/:userId').get(read).put(update).delete(remove);

router.param('userId');

export default router;
