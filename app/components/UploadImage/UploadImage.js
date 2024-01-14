import React from 'react'
import { Box, IconButton, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styles from './uploadImage.module.css';

export default function UploadImage({ file, onImageUpload }) {
  return (
    <>
      <Box component="label" for="uploadImageInput" className={styles['upload-image']}>
        <input onInput={onImageUpload} accept="image/*" className={styles['upload-image__input']} name=" uploadImageInput" id="uploadImageInput" type='file' aria-labelledby='upload featured image' />
        <IconButton className={styles['upload-image__icon']}>
          <CloudUploadIcon fontSize={'large'} />
        </IconButton>
        <Typography className={styles['upload-image__text']}>
          {file.name || 'Upload banner for your post'}
        </Typography>
      </Box>
    </>
  )
}

