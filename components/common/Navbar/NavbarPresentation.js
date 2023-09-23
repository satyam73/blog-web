import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import styles from './navbar.module.css';
import { NAVBAR_ITEMS } from "./navbar.constant";
import { useTheme } from "@mui/material";
export default function NavbarPresentation() {
  const theme = useTheme();
  const navbarItemsMapping = NAVBAR_ITEMS.map((item) => (
    <Button data-testid={`navbar-item-${item.name}`} key={item.name} sx={{ color: theme.palette.primary.dark }}>
      {item.text}
    </Button>
  ));

  return (
    <AppBar component="nav">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          Bloggie
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {navbarItemsMapping}
        </Box>
      </Toolbar>
    </AppBar>
  )
}