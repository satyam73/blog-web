import React from 'react'
import { Box, IconButton, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styles from './uploadImage.module.css';

export default function UploadImage({ style = {}, file, onImageUpload }) {
  return (
    <>
      <Box component="label" htmlFor="uploadImageInput" className={styles['upload-image']} style={{ ...style }}>
        <input onInput={onImageUpload} accept="image/*" className={styles['upload-image__input']} name=" uploadImageInput" id="uploadImageInput" type='file' aria-labelledby='upload featured image' />
        <CloudUploadIcon className={styles['upload-image__icon']} fontSize={'large'} />
        <Typography className={styles['upload-image__text']}>
          {file.name || 'Upload banner for your post'}
        </Typography>
      </Box >
    </>
  )
}

