import Link from "next/link";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

import { useUser } from "@/app/contexts/UserProvider";

import { NAVBAR_ITEMS } from "./navbar.constant";

import styles from './navbar.module.css';

export default function NavbarPresentation({ activeLinkIndex, onNavbarItemClick }) {
  const { user, loading } = useUser()
  const navbarItemsMapping = NAVBAR_ITEMS.map((item, index) => {
    if (item.isProtected) {
      if (!loading && user) {
        return (<Button variant='text' onClick={() => onNavbarItemClick(index, item)} className={`${styles['navbar__item']} ${activeLinkIndex == index ? styles['navbar__item--active'] : ''}`} data-testid={`navbar-item-${item.name}`} key={item.name} >
          {item.text}
        </Button>)
      }
    } else {
      return (<Button variant='text' onClick={() => onNavbarItemClick(index, item)} className={`${styles['navbar__item']} ${activeLinkIndex == index ? styles['navbar__item--active'] : ''}`} data-testid={`navbar-item-${item.name}`} key={item.name} >
        {item.text}
      </Button>)
    }
  });

  return (
    <AppBar component="nav">
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          className={styles['navbar__logo']}
        >
          <Link href='/' style={{ textDecoration: 'none', color: 'var(--secondary-color)' }}>
            Bloggie
          </Link>
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {navbarItemsMapping}
        </Box>
      </Toolbar>
    </AppBar>
  )
}