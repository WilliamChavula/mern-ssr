import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import HomeIcon from '@mui/icons-material/Home';
import { clearJWT, isAuthenticated } from '../auth/auth-helper';

const isActive = (location, path) => {
	if (location.pathname === path) return { color: '#ff4081' };
	else return { color: '#ffffff' };
};

const Menu = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const user = isAuthenticated();

	return (
		<AppBar position='static'>
			<Toolbar>
				<Typography
					variant='h6'
					color='inherit'>
					MERN Skeleton
				</Typography>
				<Link to='/'>
					<IconButton
						aria-label='Home'
						style={isActive(location, '/')}>
						<HomeIcon />
					</IconButton>
				</Link>
				<Link to='/users'>
					<Button style={isActive(location, '/users')}>Users</Button>
				</Link>
				{!user && (
					<span>
						<Link to='/signup'>
							<Button style={isActive(location, '/signup')}>Sign up</Button>
						</Link>
						<Link to='/signin'>
							<Button style={isActive(location, '/signin')}>Sign In</Button>
						</Link>
					</span>
				)}
				{user && (
					<span>
						<Link to={'/user/' + user._id}>
							<Button style={isActive(location, '/user/' + user._id)}>
								My Profile
							</Button>
						</Link>
						<Button
							color='inherit'
							onClick={() => {
								clearJWT(() => navigate('/'));
							}}>
							Sign out
						</Button>
					</span>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Menu;
