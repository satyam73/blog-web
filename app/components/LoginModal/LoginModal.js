import { useState } from 'react';
import { useRouter } from 'next/router';
import { emailValidator, passwordValidator } from '@/utilities/validators';
import { useToast } from '@/app/contexts/ToastProvider';
import signIn from '@/app/firebase/auth/signin';
import LoginModalPresentation from './LoginModalPresentation';
import { ERROR_MESSAGES, FIREBASE_ERRROR_CODES, INFO_MESSAGES, SOMETHING_WENT_WRONG, TOAST_HIDEOUT_TIME, TOAST_OPTIONS_TOP_RIGHT, TOAST_TYPES } from '@/constants';
import { LOGIN_SUCCESS_MESSAGE } from './loginModal.constant';

export default function LoginModal({ open, handleClose, openRegisterModal }) {
  const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });
  const [isDetailsValid, setIsDetailsValid] = useState({
    email: true,
    password: true
  });
  const { toast, showToast } = useToast();
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const router = useRouter();
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
    setIsLoginLoading(true);
    const trimmedEmail = loginDetails.email.trim();
    const trimmedPassword = loginDetails.password.trim();
    const isEmailValid = emailValidator(trimmedEmail);
    const isPasswordValid = passwordValidator(trimmedPassword);

    setIsDetailsValid({ email: isEmailValid, password: isPasswordValid });

    const isAllInputsValid = isEmailValid && isPasswordValid;
    try {
      if (isAllInputsValid) {
        const { error, result } = await signIn(trimmedEmail, trimmedPassword);
        let toastMessage = '';
        let toastType = '';

        if (!error && result?.user?.uid) {
          showToast({ ...toast, isVisible: true, text: LOGIN_SUCCESS_MESSAGE, type: TOAST_TYPES.SUCCESS });
          handleClose();
          router.push('/blogs');
          return;
        }

        switch (error?.code) {
          case FIREBASE_ERRROR_CODES.AUTH_TOO_MANY_REQUESTS:
            toastMessage = INFO_MESSAGES.TOO_MANY_REQUESTS;
            toastType = TOAST_TYPES.INFO;
            break;
          case FIREBASE_ERRROR_CODES.AUTH_INVALID_LOGIN_CREDENTIALS:
            toastMessage = ERROR_MESSAGES.INVALID_LOGIN_CREDENTIALS;
            toastType = TOAST_TYPES.ERROR;
            break;
          default:
            toastMessage = ERROR_MESSAGES.SOMETHING_WENT_WRONG;
            toastType = TOAST_TYPES.ERROR;
        }

        showToast({ ...toast, isVisible: true, text: toastMessage, type: toastType });
      }
    } catch (error) {
      showToast({ ...toast, isVisible: true, text: ERROR_MESSAGES.SOMETHING_WENT_WRONG, type: TOAST_TYPES.ERROR });
      console.error('Some error occured ', error)
    } finally {
      setIsLoginLoading(false)
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
      isLoginLoading={isLoginLoading}
      openRegisterModal={openRegisterModal}
    />
  )
}
