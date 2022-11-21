import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

import { authenticate } from './auth-helper';
import { signin } from './api-auth';
import { CardComponent, IconComponent, TextFieldComponent, TypographyComponent } from '../user/styles';


const Signin = () => {
	const location = useLocation();
	const [values, setValues] = React.useState({
		email: '',
		password: '',
		error: '',
		redirectToReferrer: false,
	});

	const handleChange = ({ target: { value, name } }) => {
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = () => {
		try {
			const user = {
				email: values.email || undefined,
				password: values.password || undefined,
			};

			signin(user).then(data => {

				authenticate(data, () => {
					setValues({ ...values, error: '', redirectToReferrer: true });
				});
			});
		} catch (error) {
			setValues({ ...values, error: data.error });
		}
	};

	const { from } = location.state || {
		from: {
			pathname: '/',
		},
	};

	const { redirectToReferrer } = values;
	if (redirectToReferrer) return <Navigate to={from} />;

	return (
		<CardComponent>
			<CardContent>
				<TypographyComponent variant='h6'>Sign in</TypographyComponent>
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
	);
};

export default Signin;
