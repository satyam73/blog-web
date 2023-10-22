const emailValidator = (value) => {
  const regexForEmail = /^(?!\.)[a-z A-Z 0-9 .!#$%&'*+-/=?^_`{|}~-]+@{1}[a-zA-Z0-9-]+\.{1}[a-zA-Z0-9-]+$/;
  return regexForEmail.test(value);
}

const isOnlyAlphabetChars = (value) => {
  const regexForAlphabet = /^([a-z A-Z]){2,}$/;
  return regexForAlphabet.test(value);
}

const passwordValidator = (value) => {
  const regexForStrongPassword = /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;

  return regexForStrongPassword.test(value);
}

export { emailValidator, isOnlyAlphabetChars, passwordValidator }; 