import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import styles from './blogCard.module.css';

export default function BlogCardPresentation({ title, image, onClick = () => { } }) {
  return <Box component="div" onClick={onClick} className={styles['blog-card']} data-testid="blog-card">
    <Box component="span" className={styles['blog-card__image-container']} data-testid="blog-card-image-container">
      <Image src={image} height={130} width={130} className={styles['image-container__image']} alt="blog card image" />
    </Box>
    <Typography component='h4' className={styles['blog-card__title']} >
      {title}
    </Typography>
  </Box>
}