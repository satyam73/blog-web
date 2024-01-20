import { Box, Button, IconButton } from '@mui/material';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';

import styles from './unauthorizeModal.module.css';
import Modal from '@/app/components/common/Modal/Modal';

export default function UnauthorizeModalPresentation({ open, handleClose, onLoginClick }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={styles['unauthorize-modal']}>
        <IconButton
          className={styles['unauthorize-modal__close-button']}
          onClick={handleClose}
        >
          <CloseIcon fontSize='medium' />
        </IconButton>
        <Box
          component='span'
          className={styles['unauthorize-modal__image-container']}
        >
          <Image
            className={styles['image-container__image']}
            src={'assets/unauthorized.svg'}
            alt='unauthorized illustration'
            height={150}
            width={150}
          />
        </Box>
        <Box className={styles['unauthorize-modal__main']}>
          <Button onClick={onLoginClick} variant='contained'>
            Login
          </Button>
        </Box>
      </Box>
    </Modal>
  );

}