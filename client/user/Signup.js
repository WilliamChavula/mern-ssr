import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Typography from '@mui/material/Typography';

import { create } from './api-user';
import { CardComponent, IconComponent, TextFieldComponent, TypographyComponent } from './styles';

const Signup = () => {
	const [values, setValues] = React.useState({
		name: '',
		password: '',
		email: '',
		open: false,
		error: '',
	});

	const handleChange = ({ target: { value, name } }) => {
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = async event => {
		event.preventDefault();

		try {
			const user = {
				name: values.name || undefined,
				email: values.email || undefined,
				password: values.password || undefined,
			};

			await create(user);
			setValues({ ...values, error: '', open: true });
		} catch (error) {
			setValues({ ...values, error });
		}
	};

	return (
		<div>
			<CardComponent>
				<CardContent>
					<TypographyComponent variant='h6'>Sign up</TypographyComponent>
					<TextFieldComponent
						id='name'
						name='name'
						value={values.name}
						onChange={handleChange}
						margin='normal'
						label='Name'
					/>
					<br />
					<TextFieldComponent
						id='email'
						name='email'
						value={values.email}
						onChange={handleChange}
						margin='normal'
						label='Email'
					/>
					<br />
					<TextFieldComponent
						id='password'
						name='password'
						value={values.password}
						onChange={handleChange}
						type='password'
						margin='normal'
						label='Password'
					/>
					<br />
					{values.error && (
						<Typography
							component='p'
							color='error'>
							<IconComponent color='error'>error</IconComponent>
							{values.error}
						</Typography>
					)}
				</CardContent>
				<CardActions>
					<Button
						sx={{ m: 'auto', mb: 2 }}
						color='primary'
						variant='contained'
						onClick={handleSubmit}>
						Submit
					</Button>
				</CardActions>
			</CardComponent>
			<Dialog
				open={values.open}
				disableBackdropClick={true}>
				<DialogTitle>New Account</DialogTitle>
				<DialogContent>
					<DialogContentText>
						New account successfully created.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Link to='/signin'>
						<Button
							color='primary'
							autoFocus='autoFocus'
							variant='contained'>
							Sign In
						</Button>
					</Link>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Signup;
