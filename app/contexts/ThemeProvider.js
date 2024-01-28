import { createTheme } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

let theme = createTheme({
  palette: {
    primary: {
      main: '#292524',
      light: '#fafaf9',
      dark: '#57534e',
    },

  },
  typography: {
    allVariants: {
      fontFamily: montserrat.style.fontFamily,
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h1: {
      fontSize: '2.5rem'
    },
    h2: {
      fontSize: '2.2rem'
    },
    h3: {
      fontSize: '2rem'
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.8rem'
    },
    h5: {
      fontSize: '1.5rem'
    },
    h6: {
      fontSize: '1.2rem'
    }
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

theme = createTheme(theme, {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.primary.dark,
          color: theme.palette.primary.light,
          borderRadius: '10px',
          textTransform: 'none',
          letterSpacing: 0,
          fontFamily: 'Montserrat',
          fontWeight: 600
        },
      },
      variants: [
        {
          props: {
            variant: 'outlined',
          },
          style: {
            backgroundColor: 'transparent',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: 'unset',
            },
          },
        },
        {
          props: {
            variant: 'contained',
          },
          style: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.light,
            border: 'none',
            '&:hover': {
              backgroundColor: '#fffff',
            },
          },
        },
        {
          props: {
            variant: 'text',
          },
          style: {
            backgroundColor: 'transparent',
            color: theme.palette.primary.main,
            border: 'none',
            '&:hover': {
              backgroundColor: 'unset',
            },
          },
        },
      ],
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.primary.dark,
          // position: 'sticky',
          top: 'auto',
          // bottom: '0',
          right: '0',
          // bottom: '0px',
          left: '0',
        }
      }
    }
  },
});

export default function ThemeProvider({ children }) {
  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  )
}