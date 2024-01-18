import { useState } from 'react';
import signUp from '@/app/firebase/auth/signup';
import { emailValidator, isOnlyAlphabetChars, passwordValidator } from '@/utilities/validators';
import RegisterModalPresentation from './RegisterModalPresentation';
import { FIREBASE_ERRROR_CODES, INFO_MESSAGES, SUCCESS_MESSAGES, TOAST_TYPES } from '@/constants';
import { useToast } from '@/app/contexts/ToastProvider';
import { useRouter } from 'next/router';


export default function RegisterModal({ open, handleClose, openLoginModal }) {
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
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const { toast, showToast } = useToast();
  const router = useRouter();
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
    setIsSignupLoading(true);
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
        let toastMessage = '';
        let toastType = '';

        if (!error && result?.user?.uid) {
          showToast({ ...toast, isVisible: true, text: SUCCESS_MESSAGES.SIGNUP_SUCCESS_MESSAGE, type: TOAST_TYPES.SUCCESS })
          handleClose();
          router.push('/blogs');
          return;
        }

        switch (error?.code) {
          case FIREBASE_ERRROR_CODES.AUTH_EMAIL_ALREADY_IN_USE:
            toastMessage = INFO_MESSAGES.EMAIL_ALREADY_EXISTS_MESSAGE;
            toastType = TOAST_TYPES.INFO;
            break;
          default:
            toastMessage = ERROR_MESSAGES.SOMETHING_WENT_WRONG;
            toastType = TOAST_TYPES.ERROR;
        }

        showToast({ ...toast, isVisible: true, text: toastMessage, type: toastType });
      }
    } catch (error) {
      console.error('Some error occured while registering ', error)
    } finally {
      setIsSignupLoading(false);
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
      isSignupLoading={isSignupLoading}
      openLoginModal={openLoginModal}
    />
  )
}
