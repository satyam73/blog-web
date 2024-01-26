import { Box, Button, CircularProgress, IconButton } from '@mui/material';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import InputBox from '../common/Input/InputBox';
import Modal from '../common/Modal/Modal';
import styles from './loginModal.module.css';

export default function LoginModalPresentation({ open, handleClose, handleChange, handleLogin, isDetailsValid, loginDetails, isLoginLoading, openRegisterModal }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={styles['login-modal']}>
        <IconButton
          className={styles['login-modal__close-button']}
          onClick={handleClose}
        >
          <CloseIcon fontSize='medium' />
        </IconButton>
        <Box
          component='span'
          className={styles['login-modal__image-container']}
        >
          <Image
            className={styles['image-container__image']}
            src={'assets/login.svg'}
            alt='welcome cat illustration'
            height={130}
            width={130}
          />
        </Box>
        <Box className={styles['login-modal__main']}>
          <form className={styles['main__form']}>
            <InputBox
              value={loginDetails.email}
              type={'text'}
              name={'Email'}
              placeholder={'Enter your email'}
              id='email'
              handleChange={handleChange}
              isValid={isDetailsValid.email}
            />
            <InputBox
              value={loginDetails.password}
              type={'password'}
              name={'Password'}
              placeholder={'Enter your password'}
              id='password'
              handleChange={handleChange}
              isValid={isDetailsValid.password}
            />
            <Button sx={{ textDecoration: 'underline', '&:hover': { textDecoration: 'underline' } }} variant='text' onClick={() => {
              handleClose();
              openRegisterModal();
            }}>Don't have account? Click here</Button>
            <Button disabled={isLoginLoading} onClick={handleLogin} variant='contained' className={styles['form__button']}>
              {isLoginLoading && <CircularProgress size={20} color="inherit" />}
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </Modal>
  );

}