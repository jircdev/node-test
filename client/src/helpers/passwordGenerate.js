const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const integers = '0123456789';
const exCharacters = '!@#$%^&*_-=+';

export const createPassword = (length, hasNumbers, hasSymbols) => {
  let chars = alpha;
  if (hasNumbers) {
    chars += integers;
  }
  if (hasSymbols) {
    chars += exCharacters;
  }
  return generatePassword(length, chars);
};

const generatePassword = (length, chars) => {
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};
