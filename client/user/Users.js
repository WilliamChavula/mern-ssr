import Logger from 'js-logger';
import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Person from '@mui/icons-material/Person';
import ArrowForward from '@mui/icons-material/ArrowForward';

import { list } from './api-user';

Logger.useDefaults();

const Users = () => {
	const [users, setUsers] = React.useState([]);

	React.useEffect(() => {
		const abortController = new AbortController();
		const abortSignal = abortController.signal;

		async function getUsers() {
			try {
				const users = await list(abortSignal);
				setUsers(users);
			} catch (error) {
				Logger.error(error);
			}
		}

		getUsers();

		return () => {
			abortController.abort();
		};
	}, []);

	return (
		<Paper
			sx={{
				padding: theme => theme.spacing(1),
				margin: theme => theme.spacing(5),
			}}
			elevation={4}>
			<Typography
				variant='h6'
				sx={{
					margin: theme => `${theme.spacing(4)}px ${theme.spacing(2)}px`,
					color: theme => theme.palette.openTitle,
				}}>
				All Users
			</Typography>
			<List dense>
				{users.map((user, index) => {
					return (
						<Link
							to={`/user/${user._id}`}
							key={index}>
							<ListItemButton>
								<ListItemAvatar>
									<Avatar>
										<Person />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary={user.name} />
								<ListItemSecondaryAction>
									<IconButton>
										<ArrowForward />
									</IconButton>
								</ListItemSecondaryAction>
							</ListItemButton>
						</Link>
					);
				})}
			</List>
		</Paper>
	);
};

export default Users;
