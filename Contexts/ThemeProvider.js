import { createTheme } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

const theme = createTheme({
  palette: {
    primary: {
      main: '#fafaf9',
      light: '#292524',
      dark: '#57534e'
    },

  },
  typography: {
    allVariants: {
      fontFamily: montserrat.style.fontFamily,
      fontWeight: 500,
      lineHeight: 1.4,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      mobile: 600, // down from 600px 
      desktop: 1000, // up from 1000px 
    },
  },
});

export default function ThemeProvider({ children }) {
  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  )
}