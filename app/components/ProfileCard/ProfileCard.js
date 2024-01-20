import { useUser } from '@/app/contexts/UserProvider';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import styles from './profileCard.module.css';
import { handleLoginModalChange, handleProfileModalChange, handleUnauthorizeModalChange } from '@/app/store/global';
import { useDispatch, useSelector } from 'react-redux';

export default function ProfileCard() {
  const dispatch = useDispatch();
  const { user, userDataFirebase, loading } = useUser();
  const { isUnauthorizeModalOpen } = useSelector((state) => state.global);

  function openLoginModal() {
    dispatch(handleLoginModalChange(true));
  }

  function openProfileModal() {
    dispatch(handleProfileModalChange(true));
  }
  const unauthorizeModalOpenOrEditProfileCallback = !user ? openLoginModal : openProfileModal;
  //TODO add skeleton here
  if (loading) return;
  return (
    <Box className={styles['profile-card']}>
      <Box component='span' className={styles['profile-card__image-container']}>
        <Image
          className={styles['image-container__image']}
          src={userDataFirebase?.profilePic || '/assets/profile.avif'}
          height={100}
          width={100}
        />
      </Box>
      <Typography className={styles['profile-card__name']}>
        {userDataFirebase?.name || 'Guest'}
      </Typography>
      <Typography className={styles['profile-card__bio']}>
        {userDataFirebase?.bio || ''}
      </Typography>
      <Button variant='text' onClick={unauthorizeModalOpenOrEditProfileCallback}>
        <Typography className={styles['profile-card__edit-link']}>
          {!user ? 'Login' : 'Edit Profile'}
        </Typography>
      </Button>
    </Box>
  );
}
