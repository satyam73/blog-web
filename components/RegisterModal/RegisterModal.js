import Image from 'next/image';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton } from '@mui/material';
import signUp from '@/firebase/auth/signup';
import { emailValidator, isOnlyAlphabetChars, passwordValidator } from '@/utilities/validators';
import Modal from '../common/Modal/Modal';
import InputBox from '../common/Input/InputBox';
import styles from './registerModal.module.css';
import RegisterModalPresentation from './RegisterModalPresentation';
import { addDataToDB } from '@/firebase/db/db';

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
    const targetName = e.target.name;
    setSignupDetails((prevSignupDetails) => ({ ...prevSignupDetails, [targetName]: e.target.value }));


    let isTargetValueValid;
    if (targetName === 'name') {
      isTargetValueValid = isOnlyAlphabetChars(signupDetails.name);
    } else if (targetName === 'email') {
      isTargetValueValid = emailValidator(signupDetails.email);
    } else if (targetName === 'password') {
      isTargetValueValid = passwordValidator(signupDetails.password);
    } else {
      return 0;
    }

    if (!isTargetValueValid) return;

    setErrorState({ ...errorState, [targetName]: isTargetValueValid });
  }

  async function handleSignup(e) {
    const isNameValid = isOnlyAlphabetChars(signupDetails.name.trim());
    const isEmailValid = emailValidator(signupDetails.email.trim());
    const isPasswordValid = passwordValidator(signupDetails.password.trim());

    setErrorState({ name: isNameValid, email: isEmailValid, password: isPasswordValid });

    const isAllInputsValid = isNameValid && isEmailValid && isPasswordValid;

    if (isAllInputsValid) {
      console.log('signing up...');
      const signUpResponse = await signUp(signupDetails.name, signupDetails.email, signupDetails.password);

      console.log(signUpResponse);
    }
  }

  return (
    <RegisterModalPresentation
      open={open}
      handleClose={handleClose}
      handleChange={handleChange}
      errorState={errorState}
      handleSignup={handleSignup}
    />
  )
}
