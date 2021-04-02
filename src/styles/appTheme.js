import { createMuiTheme } from '@material-ui/core/styles';
import { green, grey } from '@material-ui/core/colors';

export const defaultTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: green['A400'],
    },
    secondary: {
      main: grey[50],
    },
  },
});
