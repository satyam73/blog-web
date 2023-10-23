import { useState } from 'react';
import { emailValidator, passwordValidator } from '@/utilities/validators';
import signIn from '@/firebase/auth/signin';
import LoginModalPresentation from './LoginModalPresentation';

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
    <LoginModalPresentation
      open={open}
      handleClose={handleClose}
      handleChange={handleChange}
      handleLogin={handleLogin}
      isDetailsValid={isDetailsValid}
      loginDetails={loginDetails}
    />
  )
}
