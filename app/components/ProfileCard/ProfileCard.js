import { useUser } from '@/app/contexts/UserProvider';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import styles from './profileCard.module.css';

export default function ProfileCard() {
  const { user, userDataFirebase, loading } = useUser();
  console.log(user, userDataFirebase, loading);

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
        {userDataFirebase?.name || 'David George'}
      </Typography>
      <Typography className={styles['profile-card__bio']}>
        {userDataFirebase?.bio || 'no bio present!'}
      </Typography>
      <Link href='/profile'>
        <Typography className={styles['profile-card__edit-link']}>
          Edit Profile
        </Typography>
      </Link>
    </Box>
  );
}
