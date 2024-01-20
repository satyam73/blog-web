import React from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Typography } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import { useUser } from '@/app/contexts/UserProvider';

import styles from './homePresentation.module.css';

export default function HomePresentation({ onJoinButtonClick }) {
  const { user, loading } = useUser();
  const { push } = useRouter()
  const homeCtaCallback = (!loading && !user) ? onJoinButtonClick : () => push('/blogs');

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
        onClick={homeCtaCallback}
      >
        {(!loading && !user) ? 'Join the community' : 'Explore blogs'}
      </Button>
    </Box>
  );
}
