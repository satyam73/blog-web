import {
  AppBar as MUIAppbar,
  IconButton,
  Toolbar,
  Box,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import { APPBAR_ITEMS } from './appbar.constant';

import styles from './appbar.module.css';

export default function AppbarPresentation({
  isMenuOpen,
  anchorEl,
  handleMenuClose,
  handleMoreClick,
  activePage,
  onItemClick,
  onProfileClick,
  onSignoutClick,
}) {
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
          className={`${styles.main__item} ${
            activePage === index ? styles['main__item--active'] : ''
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
          className={`${styles.main__item} ${
            activePage === index ? styles['main__item--active'] : ''
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
    <MUIAppbar position='fixed' color='primary' className={styles.appbar}>
      <Menu
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
        <MenuItem onClick={onProfileClick}>Profile</MenuItem>
        <MenuItem onClick={onSignoutClick} sx={{ color: 'red' }}>
          Signout
        </MenuItem>
      </Menu>
      <Toolbar className={styles.appbar__main}>{itemsMapping}</Toolbar>
    </MUIAppbar>
  );
}
