import { AppBar as MUIAppbar, IconButton, Toolbar, Box, Typography } from "@mui/material";
import { Home, Article, AccountCircle } from "@mui/icons-material";

import styles from './appbar.module.css';
import { APPBAR_ITEMS } from "./appbar.constant";

export default function AppbarPresentation({ activePage, onItemClick }) {
  const itemsMapping = APPBAR_ITEMS.map((item, index) => (
    < IconButton fontSize='small' key={`appbar-item-${item.name}`} onClick={() => onItemClick(index)} className={`${styles.main__item} ${activePage === index ? styles['main__item--active'] : ''}`} data-testid={`appbar-item-${item.name}`}>
      <Box>
        {item.icon}
        <Typography variant="subtitle1" className={styles.item__text}>
          {item.text}
        </Typography>
      </Box>
    </IconButton >
  ));

  return (
    <MUIAppbar position="fixed" color="primary" className={styles.appbar}>
      <Toolbar className={styles.appbar__main}>

        {itemsMapping}
      </Toolbar>
    </MUIAppbar >
  )
}