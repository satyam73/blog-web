import Image from 'next/image';
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import 'react-image-crop/dist/ReactCrop.css';

import styles from './updateProfilePhoto.module.css';

export default function UpdateProfilePhoto({
  profilePic,
  isChangeProfileStep,
  setIsChangeProfileStep,
  setIsSubmitButtonDisabled,
  setImage,
}) {
  function onChangeButtonClick() {
    setIsChangeProfileStep(true);
    setIsSubmitButtonDisabled(false);
  }
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
            // onClick={onChangeButtonClick}
            className={styles['update-profile-photo__change-button']}
            variant='outlined'
            component='label'
            htmlFor='profilePic'
          >
            Change
            <input
              id='profilePic'
              type='file'
              className={styles['upload-profile-photo__file-input']}
              onChange={(e) => {
                setImage(e.target.files[0]);
                onChangeButtonClick();
              }}
            />
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
          src={profilePic || '/assets/profile.avif'}
          alt={'profile'}
        />
      </Box>
    </Box>
  );
}
