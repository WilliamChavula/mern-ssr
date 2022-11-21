import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { styled } from '@mui/material';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Icon from '@mui/material/Icon';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { read, update } from './api-user';
import { isAuthenticated } from '../auth/auth-helper';

const CardComponent = styled(Card)(({ theme }) => ({
	maxWidth: 600,
	margin: 'auto',
	textAlign: 'center',
	marginTop: theme.spacing(5),
	paddingBottom: theme.spacing(2),
}));

const TypographyComponent = styled(Typography)(({ theme }) => ({
	marginTop: theme.spacing(2),
	color: theme.palette.openTitle,
}));

const TextFieldComponent = styled(TextField)(({ theme }) => ({
	marginLeft: theme.spacing(1),
	marginRight: theme.spacing(1),
	width: 300,
}));

const IconComponent = styled(Icon)({
	verticalAlign: 'middle',
});

const EditProfile = () => {
	const { userId } = useParams();
	const [user, setUser] = React.useState({
		name: '',
		password: '',
		email: '',
		error: '',
		redirectToProfile: false,
	});

	const jwt = isAuthenticated();

	React.useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		async function readDataAsync() {
			try {
				const user = await read(userId, { jwt }, signal);
				setUser({ ...user, name: user.name, email: user.email });
			} catch (error) {
				setUser({ ...user, error });
			}
		}
		readDataAsync();

		return () => {
			abortController.abort();
		};
	}, [userId]);

	const handleChange = ({ target: { value, name } }) => {
		setUser({ ...user, [name]: value });
	};

	const handleSubmit = async event => {
		event.preventDefault();

		try {
			const user = {
				name: user.name || undefined,
				email: user.email || undefined,
				password: user.password || undefined,
			};

			const updatedUser = await update({ id: userId }, { jwt }, user);
			setUser({
				...user,
				name: updatedUser.name,
				password: updatedUser.password,
				email: updatedUser.email,
				error: '',
				redirectToProfile: true,
			});
		} catch (error) {
			setUser({ ...user, error });
		}
	};

	if (user.redirectToProfile) return <Navigate to={`/user/${userId}`} />;

	return (
		<CardComponent>
			<CardContent>
				<TypographyComponent variant='h6'>Edit Profile</TypographyComponent>
				<TextFieldComponent
					id='name'
					name='name'
					value={user.name}
					onChange={handleChange}
					margin='normal'
					label='Name'
				/>
				<br />
				<TextFieldComponent
					id='email'
					name='email'
					value={user.email}
					onChange={handleChange}
					margin='normal'
					label='Email'
				/>
				<br />
				<TextFieldComponent
					id='password'
					name='password'
					value={user.password}
					onChange={handleChange}
					type='password'
					margin='normal'
					label='Password'
				/>
				<br />
				{user.error && (
					<Typography
						component='p'
						color='error'>
						<IconComponent color='error'>error</IconComponent>
						{user.error}
					</Typography>
				)}
			</CardContent>
			<CardActions>
				<Button
					sx={{ m: 'auto', mb: 2 }}
					color='primary'
					variant='contained'
					onSubmit={handleSubmit}>
					Submit
				</Button>
			</CardActions>
		</CardComponent>
	);
};

export default EditProfile;
