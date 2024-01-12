import { useState } from 'react';
import signUp from '@/firebase/auth/signup';
import { emailValidator, isOnlyAlphabetChars, passwordValidator } from '@/utilities/validators';
import RegisterModalPresentation from './RegisterModalPresentation';
import { FIREBASE_ERRROR_CODES, TOAST_HIDEOUT_TIME, TOAST_OPTIONS_TOP_RIGHT, TOAST_TYPES } from '@/constants';
import { EMAIL_ALREADY_EXISTS_MESSAGE, SIGNUP_SUCCESS_MESSAGE } from './registerModal.constant';
import { Alert, Snackbar } from '@mui/material';


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
  const [isRegisterToastVisible, setIsRegisterToastVisible] = useState(false);
  const [toastDetails, setToastDetails] = useState({
    type: '', //can be error / warning / success / info
    message: ''
  });
  function handleRegisterToastClose() {
    setIsRegisterToastVisible(false);
  }
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


    try {
      if (isAllInputsValid) {
        const { result, error } = await signUp(trimmedName, trimmedEmail, trimmedPassword);

        if (!error && result?.user?.uid) {
          setToastDetails({ ...toastDetails, message: SIGNUP_SUCCESS_MESSAGE, type: TOAST_TYPES.SUCCESS })
          setIsRegisterToastVisible(true);
          handleClose();
          return;
        }

        if (error.code === FIREBASE_ERRROR_CODES.AUTH_EMAIL_ALREADY_IN_USE) {
          console.log('error is ', error, result, error.message, `error code : ${error.code}`);
          setToastDetails({ ...toastDetails, message: EMAIL_ALREADY_EXISTS_MESSAGE, type: TOAST_TYPES.INFO })
          setIsRegisterToastVisible(true);
        } else {
          setToastDetails({ ...toastDetails, message: SOMETHING_WENT_WRONG, type: TOAST_TYPES.ERROR })
          setIsRegisterToastVisible(true);
        }
      }
    } catch (error) {
      console.error('Some error occured while registering ', error)
    }
  }

  return (
    <>
      <Snackbar open={isRegisterToastVisible} autoHideDuration={TOAST_HIDEOUT_TIME} onClose={handleRegisterToastClose} anchorOrigin={TOAST_OPTIONS_TOP_RIGHT}>
        <Alert severity={toastDetails.type} sx={{ width: '100%' }}>
          {toastDetails.message}
        </Alert>
      </Snackbar>
      <RegisterModalPresentation
        open={open}
        signupDetails={signupDetails}
        isDetailsValid={isDetailsValid}
        handleClose={handleClose}
        handleChange={handleChange}
        handleSignup={handleSignup}
      />
    </>
  )
}
