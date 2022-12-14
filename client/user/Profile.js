import React from 'react';
import { styled } from '@mui/material';
import { useLocation, useParams, Navigate, Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/auth-helper';
import { read } from './api-user';

import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';

import DeleteUser from './DeleteUser';

const PaperComponent = styled(Paper)(({ theme }) => ({
	maxWidth: 600,
	margin: 'auto',
	padding: theme.spacing(3),
	marginTop: theme.spacing(5),
}));

const TypographyComponent = styled(Typography)(({ theme }) => ({
	marginTop: theme.spacing(3),
	color: theme.palette.protectedTitle,
}));

const Profile = () => {
	const location = useLocation();
	const { userId } = useParams();
	const [user, setUser] = React.useState({});
	const [redirectToSignin, setRedirectToSignin] = React.useState(false);

	React.useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		async function readDataAsync() {
			try {
				const jwt = isAuthenticated();

				const user = await read(userId, { jwt }, signal);
				
				user ? setUser(user) : setRedirectToSignin(true);
			} catch (error) {
				setRedirectToSignin(true);
			}
		}
		readDataAsync().catch(() => setRedirectToSignin(true));

		return () => {
			abortController.abort();
		};
	}, [userId]);

	if (redirectToSignin) return <Navigate to='/signin' state={{ from: location }} />;

	return (
		<PaperComponent elevation={4}>
			<TypographyComponent variant='h6'>Profile</TypographyComponent>
			<List dense>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<PersonIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={user.name}
						secondary={user.email}
					/>{' '}
					{isAuthenticated().user && isAuthenticated().user._id === user._id && (
						<ListItemSecondaryAction>
							<Link to={`/user/edit/${user._id}`}>
								<IconButton
									aria-label='Edit'
									color='primary'>
									<EditIcon />
								</IconButton>
							</Link>
							<DeleteUser userId={user._id} />
						</ListItemSecondaryAction>
					)}
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText
						primary={'Joined: ' + new Date(user.createdAt).toDateString()}
					/>
				</ListItem>
			</List>
		</PaperComponent>
	);
};

export default Profile;
