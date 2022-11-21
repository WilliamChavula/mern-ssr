import { styled } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Icon from '@mui/material/Icon';


export const CardComponent = styled(Card)(({ theme }) => ({
	maxWidth: 600,
	margin: 'auto',
	textAlign: 'center',
	marginTop: theme.spacing(5),
	paddingBottom: theme.spacing(2),
}));

export const TypographyComponent = styled(Typography)(({ theme }) => ({
	marginTop: theme.spacing(2),
	color: theme.palette.openTitle,
}));

export const TextFieldComponent = styled(TextField)(({ theme }) => ({
	marginLeft: theme.spacing(1),
	marginRight: theme.spacing(1),
	width: 300,
}));

export const IconComponent = styled(Icon)({
	verticalAlign: 'middle',
});