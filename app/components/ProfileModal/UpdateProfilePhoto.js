import React from 'react';
import styles from './updateProfilePhoto.module.css';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
export default function UpdateProfilePhoto() {
  return (
    <Box className={styles['update-profile-photo']}>
      <Box className={styles['update-profile-photo__main']}>
        <Typography
          className={styles['update-profile-photo__heading']}
          variant='body1'
        >
          Update Profile
        </Typography>
        <Typography
          className={styles['update-profile-photo__text']}
          variant='body1'
        >
          Recommended: Square
        </Typography>
        <Box className={styles['update-profile-photo__actions']}>
          <Button
            className={styles['update-profile-photo__change-button']}
            variant='outlined'
          >
            Change
          </Button>

          <Button
            className={styles['update-profile-photo__remove-button']}
            variant='outlined'
          >
            Remove
          </Button>
        </Box>
      </Box>
      <Box>
        <Image
          style={{ borderRadius: '10px' }}
          height={80}
          width={80}
          src={'/assets/profile.avif'}
          alt={'profile'}
        />
      </Box>
    </Box>
  );
}
