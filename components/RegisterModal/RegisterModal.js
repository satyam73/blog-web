import Image from 'next/image';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton } from '@mui/material';
import Modal from '../common/Modal/Modal';
import InputBox from '../common/Input/InputBox';
import styles from './registerModal.module.css';
import { emailValidator, isOnlyAlphabetChars, passwordValidator } from '@/utilities/validators';

export default function RegisterModal({ open, handleClose }) {
  const [signupDetails, setSignupDetails] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errorState, setErrorState] = useState({
    name: true,
    email: true,
    password: true
  });

  function handleChange(e) {
    setSignupDetails((prevSignupDetails) => ({ ...prevSignupDetails, [e.target.name]: e.target.value }));
  }

  function handleSignup(e) {
    const isNameValid = isOnlyAlphabetChars(signupDetails.name);
    const isEmailValid = emailValidator(signupDetails.email);
    const isPasswordValid = passwordValidator(signupDetails.password);

    setErrorState({ name: isNameValid, email: isEmailValid, password: isPasswordValid });
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
              name={'Name'}
              placeholder={'Enter your name'}
              id='name'
              handleChange={handleChange}
              isValid={errorState.name}
            />
            <InputBox
              type={'text'}
              name={'Email'}
              placeholder={'Enter your email'}
              id='email'
              handleChange={handleChange}
              isValid={errorState.email}
            />
            <InputBox
              type={'password'}
              name={'Password'}
              placeholder={'Enter your password'}
              id='password'
              handleChange={handleChange}
              isValid={errorState.password}
            />
            <Button onClick={handleSignup} variant='contained' className={styles['form__button']}>
              Signup
            </Button>
          </form>
        </Box>
      </Box>
    </Modal>
  );
}
