import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { Box, Button, Skeleton, Typography } from '@mui/material';

import { useUser } from '@/app/contexts/UserProvider';
import {
  handleLoginModalChange,
  handleProfileModalChange,
} from '@/app/store/global';

import styles from './profileCard.module.css';

export default function ProfileCard({
  image,
  name,
  bio = '',
  isButtonVisible = false,
  isLoading = false,
}) {
  const dispatch = useDispatch();
  const { user, loading } = useUser();

  function openLoginModal() {
    dispatch(handleLoginModalChange(true));
  }

  function openProfileModal() {
    dispatch(handleProfileModalChange(true));
  }
  const unauthorizeModalOpenOrEditProfileCallback = !user
    ? openLoginModal
    : openProfileModal;

  if (loading || isLoading)
    return (
      <Skeleton
        className={styles['skeleton']}
        component='div'
        variant='rectangle'
      />
    );

  return (
    <Box className={styles['profile-card']}>
      <Box component='span' className={styles['profile-card__image-container']}>
        <Image
          className={styles['image-container__image']}
          src={image || '/assets/profile.jpg'}
          height={100}
          width={100}
        />
      </Box>
      <Typography className={styles['profile-card__name']}>
        {name || 'Guest'}
      </Typography>
      <Typography className={styles['profile-card__bio']}>
        {bio || ''}
      </Typography>
      {isButtonVisible && (
        <Button
          className={styles['profile-card__edit-link']}
          variant='text'
          onClick={unauthorizeModalOpenOrEditProfileCallback}
        >
          {!user ? 'Login' : 'Edit Profile'}
        </Button>
      )}
    </Box>
  );
}
