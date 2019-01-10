export const validateUsername = userName => (!!userName && userName.length >= 3
  ? ''
  : 'Username should be at-least 3 characters');

export const validateEmail = email => (email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
  ? ''
  : 'Please submit a valid email address');

export const validatePassword = password => (password.match(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,15})$/)
  ? ''
  : 'Password should contain at-least one digit, one alphabet and at-least six characters long');
