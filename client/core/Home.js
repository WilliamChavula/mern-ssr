import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import bikeImage from '../assets/images/bike.jpg';
import { Link } from 'react-router-dom';

const CardContainer = styled(Card)(({ theme }) => ({
	maxWidth: 600,
	margin: 'auto',
	marginTop: theme.spacing(5),
}));

const Title = styled(Typography)(({ theme }) => ({
	padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px 
    ${theme.spacing(2)}px`,
	color: theme.palette.openTitle,
}));

const MediaImage = styled(CardMedia)(({ theme }) => ({
	minHeight: 400,
}));

const Home = () => {
	return (
		<CardContainer>
			<MediaImage
				image={bikeImage}
				title='Bicycle'
			/>
			<CardContent>
				<Title variant='h6'>Home Page</Title>
				<Typography
					variant='body2'
					component='p'>
					Welcome to the MERN Skeleton home page.
				</Typography>
			</CardContent>
		</CardContainer>
	);
};

export default Home;
