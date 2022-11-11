import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			contrastText: '#DDDDDF',
			main: '#4443BA',
			dark: '#212B57',
		},
		secondary: {
			contrastText: '#07070A',
			main: '#DDDDDF',
			dark: '#9FA0A3',
		},
		openTitle: '#1d1160',
		protectedTitle: '#9e1b32',
	},
});

export default theme;
