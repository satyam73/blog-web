import React from 'react'
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton } from '@mui/material';

import { handleLoginModalChange, handleUnauthorizeModalChange } from '@/app/store/global';

import styles from './unauthorizedCard.module.css';

export default function UnauthorizedCard({ onCloseButtonClick = () => { }, isCloseButtonVisible = false }) {
  const dispatch = useDispatch()
  function onLoginClick(e) {
    dispatch(handleLoginModalChange(true));
    dispatch(handleUnauthorizeModalChange(false));
  }

  return (
    <Box className={styles['unauthorize-card']}>
      {isCloseButtonVisible && <IconButton
        className={styles['unauthorize-card__close-button']}
        onClick={onCloseButtonClick}
      >
        <CloseIcon fontSize='medium' />
      </IconButton>}
      <Box
        component='span'
        className={styles['unauthorize-card__image-container']}
      >
        <Image
          className={styles['image-container__image']}
          src={'assets/unauthorized.svg'}
          alt='unauthorized illustration'
          height={150}
          width={150}
        />
      </Box>
      <Box className={styles['unauthorize-card__main']}>
        <Button onClick={onLoginClick} variant='contained'>
          Login
        </Button>
      </Box>
    </Box>
  )
}