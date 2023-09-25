import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import styles from './navbar.module.css';
import { NAVBAR_ITEMS } from "./navbar.constant";
import { useTheme } from "@mui/material";

export default function NavbarPresentation({ activeLinkIndex, onNavbarItemClick }) {
  const theme = useTheme();
  const navbarItemsMapping = NAVBAR_ITEMS.map((item, index) => (
    <Button onClick={() => onNavbarItemClick(index)} className={`${styles['navbar__item']} ${activeLinkIndex == index ? styles['navbar__item--active'] : ''}`} data-testid={`navbar-item-${item.name}`} key={item.name} sx={{ color: theme.palette.primary.dark }}>
      {item.text}
    </Button>
  ));

  return (
    <AppBar component="nav">
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          className={styles['navbar__logo']}
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