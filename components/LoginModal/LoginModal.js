import { useEffect, useState } from 'react';
import { emailValidator, passwordValidator } from '@/utilities/validators';
import signIn from '@/firebase/auth/signin';
import LoginModalPresentation from './LoginModalPresentation';
import { FIREBASE_ERRROR_CODES, SOMETHING_WENT_WRONG, TOAST_HIDEOUT_TIME, TOAST_OPTIONS_TOP_RIGHT, TOAST_TYPES } from '@/constants';
import { Alert, Snackbar } from '@mui/material';
import { LOGIN_SUCCESS_MESSAGE } from './loginModal.constant';
import { useLoginToast } from './loginModal.hooks';

export default function LoginModal({ open, handleClose, }) {
  const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });
  const [isDetailsValid, setIsDetailsValid] = useState({
    email: true,
    password: true
  });

  const [isLoginToastVisible, setIsLoginToastVisible] = useState(false);
  const [toastDetails, setToastDetails] = useState({
    type: '', //can be error / warning / success / info
    message: ''
  });
  function handleLoginToastClose() {
    setIsLoginToastVisible(false);
  }

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

    setIsDetailsValid({ email: isEmailValid, password: isPasswordValid });

    const isAllInputsValid = isEmailValid && isPasswordValid;
    try {
      if (isAllInputsValid) {
        const { error, result } = await signIn(trimmedEmail, trimmedPassword);
        if (!error && result?.user?.uid) {
          setToastDetails({ ...toastDetails, message: LOGIN_SUCCESS_MESSAGE, type: TOAST_TYPES.SUCCESS })
          setIsLoginToastVisible(true);
          handleClose();
          return;
        }

        if (error.code === FIREBASE_ERRROR_CODES.AUTH_EMAIL_ALREADY_IN_USE) {
          console.log('error is ', error, result, error.message, `error code : ${error.code}`);
          setToastDetails({ ...toastDetails, message: EMAIL_ALREADY_EXISTS_MESSAGE, type: TOAST_TYPES.INFO })
          setIsLoginToastVisible(true);
        } else {
          setToastDetails({ ...toastDetails, message: SOMETHING_WENT_WRONG, type: TOAST_TYPES.ERROR })
          setIsLoginToastVisible(true);
        }
      }
    } catch (error) {
      console.error('Some error occured ', error)
    }
  }
  return (
    <>
      <Snackbar open={isLoginToastVisible} autoHideDuration={TOAST_HIDEOUT_TIME} onClose={handleLoginToastClose} anchorOrigin={TOAST_OPTIONS_TOP_RIGHT}>
        <Alert severity={toastDetails.type} sx={{ width: '100%' }}>
          {toastDetails.message}
        </Alert>
      </Snackbar>

      <LoginModalPresentation
        open={open}
        handleClose={handleClose}
        handleChange={handleChange}
        handleLogin={handleLogin}
        isDetailsValid={isDetailsValid}
        loginDetails={loginDetails}
      />
    </>
  )
}
