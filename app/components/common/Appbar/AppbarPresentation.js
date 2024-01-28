import {
  AppBar as MUIAppbar,
  IconButton,
  Toolbar,
  Box,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';

import { useUser } from '@/app/contexts/UserProvider';

import { MENU_ITEMS } from '@/constants';
import { APPBAR_ITEMS } from './appbar.constant';

import styles from './appbar.module.css';

export default function AppbarPresentation({
  isMenuOpen,
  anchorEl,
  handleMenuClose,
  handleMoreClick,
  activePage,
  onItemClick,
  onMenuItemClick
}) {
  const { user, loading: isUserLoading } = useUser();
  const itemsMapping = APPBAR_ITEMS.map((item, index) => {
    if (index === APPBAR_ITEMS.length - 1) {
      return (
        <IconButton
          fontSize='small'
          id='appbar-more-menu'
          key={`appbar-item-${item.name}`}
          aria-controls={open ? 'appbar-more-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={(event) => handleMoreClick(event, item, index)}
          className={`${styles.main__item} ${activePage === index ? styles['main__item--active'] : ''
            }`}
          data-testid={`appbar-item-${item.name}`}
        >
          <Box>
            {item.icon}
            <Typography variant='subtitle1' className={styles.item__text}>
              {item.text}
            </Typography>
          </Box>
        </IconButton>
      );
    } else {
      return (
        <IconButton
          fontSize='small'
          key={`appbar-item-${item.name}`}
          onClick={() => onItemClick(item, index)}
          className={`${styles.main__item} ${activePage === index ? styles['main__item--active'] : ''
            }`}
          data-testid={`appbar-item-${item.name}`}
        >
          <Box>
            {item.icon}
            <Typography variant='subtitle1' className={styles.item__text}>
              {item.text}
            </Typography>
          </Box>
        </IconButton>
      );
    }
  });

  return (
    <MUIAppbar sx={{ position: 'fixed', bottom: 0, right: 0, left: 0 }} color='primary'>
      {!isUserLoading && user && <Menu
        id='appbar-more-menu'
        aria-labelledby='appbar-more-menu'
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {MENU_ITEMS.map((menu, idx) => <MenuItem key={`${menu.name}-${idx}`} sx={{ color: menu.name == 'signout' ? 'red' : 'initial', padding: '5px' }} onClick={() => onMenuItemClick(menu, idx)}>
          <IconButton
            sx={{ color: 'inherit' }}
            font='medium'>
            {menu.icon}
          </IconButton>
          {menu.text}
        </MenuItem>)}
      </Menu>}
      <Toolbar className={styles.appbar__main}>{itemsMapping}</Toolbar>
    </MUIAppbar >
  );
}
