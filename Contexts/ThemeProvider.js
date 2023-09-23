import { createTheme } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

const theme = createTheme({
  palette: {
    primary: {
      main: '#292524',
      light: '#fafaf9',
      dark: '#57534e'
    },
  },
  typography: {
    allVariants: {
      fontFamily: montserrat.style.fontFamily,
      fontWeight: 500,
      lineHeight: 1.4,
    },
  }
});

export default function ThemeProvider({ children }) {
  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  )
}