import Link from "next/link";
import { AppBar, Box, Button, Skeleton, Toolbar, Typography } from "@mui/material";

import { useUser } from "@/app/contexts/UserProvider";

import { NAVBAR_ITEMS } from "./navbar.constant";

import styles from './navbar.module.css';

export default function NavbarPresentation({ activeLinkIndex, onNavbarItemClick }) {
  const { user, loading: isUserLoading } = useUser();
  const navbarItemsMapping = NAVBAR_ITEMS.map((item, index) => {
    if (item.isProtected) {
      if (!isUserLoading && user) {
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

  const skeletonMappingForNavbarItems = Array(6).fill('navbar-items-skeleton').map((item, idx) => <Skeleton variant="rounded" height={20} width={60} />)
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
          {isUserLoading ?
            <Box sx={{ display: 'flex', gap: '10px' }}>
              {skeletonMappingForNavbarItems}
            </Box> :
            navbarItemsMapping}
        </Box>
      </Toolbar>
    </AppBar>
  )
}