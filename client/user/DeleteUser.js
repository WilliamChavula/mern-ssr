import React from 'react';
import Logger from 'js-logger';
import { redirect } from 'react-router-dom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';

import { remove } from './api-user';
import { isAuthenticated, clearJWT } from '../auth/auth-helper';

import DeleteIcon from '@mui/icons-material/Delete';

const DeleteUser = ({ userId }) => {
	const [open, setOpen] = React.useState(false);
	const [redirect, setRedirect] = React.useState(false);

	const handleDialogOpen = () => setOpen(true);
	const handleDialogClose = () => setOpen(false);

	const handleConfirmDelete = async () => {
		try {
			const jwt = isAuthenticated();

			await remove({ id: userId }, { jwt });
			await clearJWT(() => Logger.info('Account deleted'));

			setRedirect(true);
		} catch (error) {
			Logger.error(error);
		}
	};

	if (redirect) return redirect('/');

	return (
		<span>
			<IconButton
				aria-label='Delete'
				onClick={handleDialogOpen}
				color='secondary'>
				<DeleteIcon />
			</IconButton>
			<Dialog
				open={open}
				onClose={handleDialogClose}>
				<DialogTitle>Delete Account</DialogTitle>
				<DialogContent>
					<DialogContentText>Confirm to delete your account.</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleDialogClose}
						color='primary'>
						Cancel
					</Button>
					<Button
						onClick={handleConfirmDelete}
						color='secondary'
						autoFocus='autoFocus'>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</span>
	);
};

export default DeleteUser;
