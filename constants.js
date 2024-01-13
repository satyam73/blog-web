export const TOAST_HIDEOUT_TIME = 2500;
export const TOAST_OPTIONS_TOP_RIGHT = { vertical: 'top', horizontal: 'right' }
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
}

export const ERROR_MESSAGES = {
  SOMETHING_WENT_WRONG: 'Something went wrong',
  INVALID_LOGIN_CREDENTIALS: 'Invalid login credentials',
}

export const INFO_MESSAGES = {
  TOO_MANY_REQUESTS: 'Too many requests please try again later',
  EMAIL_ALREADY_EXISTS_MESSAGE: 'Email already exists'
}

export const SUCCESS_MESSAGES = {
  SIGNUP_SUCCESS_MESSAGE: 'Successfully signed up',
}

export const FIREBASE_ERRROR_CODES = {
  AUTH_EMAIL_ALREADY_IN_USE: 'auth/email-already-in-use',
  AUTH_INVALID_EMAIL: 'auth/invalid-email',
  AUTH_USER_DISABLED: 'auth/user-disabled',
  AUTH_USER_NOT_FOUND: 'auth/user-not-found',
  AUTH_WRONG_PASSWORD: 'auth/wrong-password',
  AUTH_INVALID_LOGIN_CREDENTIALS: 'auth/invalid-login-credentials',
  AUTH_TOO_MANY_REQUESTS: 'auth/too-many-requests'
}