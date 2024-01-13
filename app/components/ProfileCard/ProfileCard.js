import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import styles from './profileCard.module.css';

export default function ProfileCard({ name, image, bio }) {
  return (
    <Box className={styles['profile-card']}>
      <Box component='span' className={styles['profile-card__image-container']}>
        <Image
          className={styles['image-container__image']}
          src={image || '/assets/profile.avif'}
          height={100}
          width={100}
        />
      </Box>
      <Typography className={styles['profile-card__name']}>
        {name || 'David George'}
      </Typography>
      <Typography className={styles['profile-card__bio']}>
        {bio ||
          `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque
        autem sunt sapiente, vitae repellendus molestiae temporibus eveniet ipsa
        soluta esse.`}
      </Typography>
      <Link href='/profile'>
        <Typography className={styles['profile-card__edit-link']}>
          Edit Profile
        </Typography>
      </Link>
    </Box>
  );
}
