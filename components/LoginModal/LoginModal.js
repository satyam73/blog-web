import { Box, Button, IconButton } from '@mui/material';
import Modal from '../common/Modal/Modal';
import Image from 'next/image';
import InputBox from '../common/Input/InputBox';
import CloseIcon from '@mui/icons-material/Close';
import styles from './loginModal.module.css';
import { useState } from 'react';
import { emailValidator, passwordValidator } from '@/utilities/validators';
import signIn from '@/firebase/auth/signin';

export default function LoginModal({ open, handleClose, }) {
  const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });
  const [isDetailsValid, setIsDetailsValid] = useState({
    email: true,
    password: true
  });

  function handleChange(e) {
    const targetName = e.target.name;
    setLoginDetails(prevLoginDetails => ({ ...prevLoginDetails, [targetName]: e.target.value }));

    let isTargetValueValid;
    if (targetName === 'email') {
      isTargetValueValid = emailValidator(loginDetails.email);
    } else if (targetName === 'password') {
      isTargetValueValid = passwordValidator(loginDetails.password);
    } else {
      return 0;
    }

    if (!isTargetValueValid) return;

    setIsDetailsValid({ ...isDetailsValid, [targetName]: isTargetValueValid });
  }

  async function handleLogin(e) {
    const trimmedEmail = loginDetails.email.trim();
    const trimmedPassword = loginDetails.password.trim();
    const isEmailValid = emailValidator(trimmedEmail);
    const isPasswordValid = passwordValidator(trimmedPassword);
    console.log('handle login');

    setIsDetailsValid({ email: isEmailValid, password: isPasswordValid });

    const isAllInputsValid = isEmailValid && isPasswordValid;

    if (isAllInputsValid) {
      const signInResponse = await signIn(trimmedEmail, trimmedPassword);

      console.log(signInResponse);
    }
  }
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
            <Button onClick={handleLogin} variant='contained' className={styles['form__button']}>
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </Modal>
  );
}
