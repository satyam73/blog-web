import Image from 'next/image';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Typography } from '@mui/material';

import styles from './blogCard.module.css';

export default function BlogCardPresentation({ id, title, image, onPostClick = () => { }, isEditMode, onEditClick = () => { } }) {
  return (
    <Box component="div" onClick={onPostClick} className={styles['blog-card']} data-testid="blog-card" >
      <Box component="span" className={styles['blog-card__image-container']} data-testid="blog-card-image-container">
        <Image src={image} height={130} width={130} className={styles['image-container__image']} alt="blog card image" />
      </Box>
      <Typography component='h4' className={styles['blog-card__title']} >
        {title}
      </Typography>
      {isEditMode &&
        <IconButton sx={{ alignSelf: 'flex-start', marginLeft: 'auto' }} className={styles['blog-card__edit-button']} onClick={onEditClick}>
          <EditIcon fontSize='medium' />
        </IconButton>}
    </Box >
  );
}