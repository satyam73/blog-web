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
  let homeCtaText;

  if (loading) {
    homeCtaText = 'Loading...';
  } else if (user) {
    homeCtaText = 'Explore blogs';
  } else {
    homeCtaText = 'Join the community';
  }

  return (
    <Box className={styles.home}>
      <Typography variant='h4' className={styles['home__heading']}>
        Start pouring your creativity!
      </Typography>
      <Typography variant='h6' className={styles['home__description']}>
        Start writing blogs that matters to the world and to you. Publish in one click!
        Join in now the journey awaits you😀
      </Typography>
      <Typography variant='h6' className={styles['home__description']}>
      </Typography>
      <Button
        className={styles['home__cta-button']}
        variant='contained'
        endIcon={<KeyboardDoubleArrowRightIcon />}
        onClick={homeCtaCallback}
      >
        {homeCtaText}
      </Button>
    </Box>
  );
}
