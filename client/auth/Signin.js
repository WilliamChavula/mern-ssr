import React from 'react';
import { styled } from '@mui/material';
import { Navigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Icon from '@mui/material/Icon';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { authenticate } from './auth-helper';
import { signin } from './api-auth';

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

const ButtonComponent = styled(Button)(({ theme }) => ({
	margin: 'auto',
	marginBottom: theme.spacing(2),
}));

const Signin = props => {
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
				console.log('called');

				authenticate(data, () => {
					setValues({ ...values, error: '', redirectToReferrer: true });
				});
			});
		} catch (error) {
			console.log({ error });
			setValues({ ...values, error: data.error });
		}
	};

	const { from } = props.location?.state || {
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
