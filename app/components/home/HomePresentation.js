import React from 'react';
import styles from './homePresentation.module.css';
import { Box, Button, Typography } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export default function HomePresentation({ onJoinButtonClick }) {
  return (
    <Box className={styles.home}>
      <Typography variant='h4' className={styles['home__heading']}>
        Lorem ipsum dolor sit amet, consectetur
      </Typography>
      <Typography variant='h6' className={styles['home__description']}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum labore
        corrupti est molestiae atque dolorem neque impedit, voluptates dolor
        officia.
      </Typography>
      <Button
        className={styles['home__cta-button']}
        variant='contained'
        endIcon={<KeyboardDoubleArrowRightIcon />}
        onClick={onJoinButtonClick}
      >
        Join the community
      </Button>
    </Box>
  );
}
