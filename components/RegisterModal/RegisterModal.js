import { useState } from 'react';
import signUp from '@/firebase/auth/signup';
import { emailValidator, isOnlyAlphabetChars, passwordValidator } from '@/utilities/validators';
import RegisterModalPresentation from './RegisterModalPresentation';


export default function RegisterModal({ open, handleClose }) {
  const [signupDetails, setSignupDetails] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [isDetailsValid, setIsDetailsValid] = useState({
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

    setIsDetailsValid({ ...isDetailsValid, [targetName]: isTargetValueValid });
  }

  async function handleSignup(e) {
    const trimmedName = signupDetails.name.trim();
    const trimmedEmail = signupDetails.email.trim();
    const trimmedPassword = signupDetails.password.trim();
    const isNameValid = isOnlyAlphabetChars(trimmedName);
    const isEmailValid = emailValidator(trimmedEmail);
    const isPasswordValid = passwordValidator(trimmedPassword);

    setIsDetailsValid({ name: isNameValid, email: isEmailValid, password: isPasswordValid });

    const isAllInputsValid = isNameValid && isEmailValid && isPasswordValid;

    if (isAllInputsValid) {
      const signUpResponse = await signUp(trimmedName, trimmedEmail, trimmedPassword);

      console.log(signUpResponse);
    }
  }

  return (
    <RegisterModalPresentation
      open={open}
      signupDetails={signupDetails}
      isDetailsValid={isDetailsValid}
      handleClose={handleClose}
      handleChange={handleChange}
      handleSignup={handleSignup}
    />
  )
}
