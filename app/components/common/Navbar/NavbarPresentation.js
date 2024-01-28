import Link from "next/link";
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Skeleton, Toolbar, Typography } from "@mui/material";

import { useUser } from "@/app/contexts/UserProvider";

import { MENU_ITEMS } from "@/constants";
import { NAVBAR_ITEMS } from "./navbar.constant";

import styles from './navbar.module.css';

export default function NavbarPresentation({ activeLinkIndex, onNavbarItemClick, isMenuOpen,
  anchorEl, handleMenuClose, handleProfileClick, onMenuItemClick }) {
  const { user, loading: isUserLoading } = useUser();

  const navbarItemsMapping = NAVBAR_ITEMS.map((item, index) => {
    if (item.isProtected) {
      if (!isUserLoading && user) {
        if (item?.component)
          return (<IconButton
            font='medium'
            id='navbar-profile-menu'
            key={`navbar-item-${item.name}`}
            aria-controls={open ? 'navbar-more-menu' : undefined}
            aria-haspopup='true'
            onClick={(event) => handleProfileClick(event, item, index)}
            aria-expanded={open ? 'true' : undefined}
          >
            {item.component}
          </IconButton>)

        return (<Button variant='text' onClick={() => onNavbarItemClick(item, index)} className={`${styles['navbar__item']} ${activeLinkIndex == index ? styles['navbar__item--active'] : ''}`} data-testid={`navbar-item-${item.name}`} key={item.name} >
          {item.text}
        </Button>)
      }
    } else {
      return (<Button variant='text' onClick={() => onNavbarItemClick(item, index)} className={`${styles['navbar__item']} ${activeLinkIndex == index ? styles['navbar__item--active'] : ''}`} data-testid={`navbar-item-${item.name}`} key={item.name} >
        {item.text}
      </Button>)
    }
  });

  const skeletonMappingForNavbarItems = Array(3).fill('navbar-items-skeleton').map((item, idx) => <Skeleton variant={idx === 2 ? 'circular' : 'rounded'} height={40} width={idx == 2 ? 40 : 70} key={`${item}-${idx}`} />);

  return (
    <AppBar component="nav">
      {!isUserLoading && user && <Menu
        id='navbar-profile-menu'
        aria-labelledby='navbar-profile-menu'
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        transformOrigin={{
          vertical: -10,
          horizontal: 50,
        }}
      >
        {MENU_ITEMS.map((menu, idx) => <MenuItem key={`navbar-${menu.name}-${idx}`} sx={{ color: menu.name == 'signout' ? 'red' : 'initial', padding: '5px' }} onClick={() => onNavbarItemClick(menu, idx)}>
          <IconButton
            sx={{ color: 'inherit' }}
            font='medium'>
            {menu.icon}
          </IconButton>
          {menu.text}</MenuItem>)}
      </Menu>}

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