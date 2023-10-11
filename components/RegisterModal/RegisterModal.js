import { Box, Button, IconButton } from '@mui/material';
import styles from './registerModal.module.css';
import Modal from '../common/Modal/Modal';
import CloseIcon from '@mui/icons-material/Close';
import InputBox from '../common/Input/InputBox';
import Image from 'next/image';

export default function RegisterModal({ open, handleClose }) {
  function handleChange() {
    //TODO implement this function
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={styles['register-modal']}>
        <IconButton
          className={styles['register-modal__close-button']}
          onClick={handleClose}
        >
          <CloseIcon fontSize='medium' />
        </IconButton>
        <Box
          component='span'
          className={styles['register-modal__image-container']}
        >
          <Image
            className={styles['image-container__image']}
            src={'assets/welcome.svg'}
            alt='welcome cat illustration'
            height={130}
            width={130}
          />
        </Box>
        <Box className={styles['register-modal__main']}>
          <form className={styles['main__form']}>
            <InputBox
              type={'text'}
              name={'Email'}
              placeholder={'Enter your email'}
              id='email'
              handleChange={handleChange}
            />

            <InputBox
              type={'password'}
              name={'Password'}
              placeholder={'Enter your password'}
              id='password'
              handleChange={handleChange}
            />
            <Button variant='contained' className={styles['form__button']}>
              Signup
            </Button>
          </form>
        </Box>
      </Box>
    </Modal>
  );
}
