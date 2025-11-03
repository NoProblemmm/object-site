const EMAIL_REGEX = new RegExp(/^\S+@\S+\.\S+$/);
const PASSWORD_REGEX = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/
);
const NAME_REGEX = new RegExp(/^[A-Za-zА-Яа-яЁё]+$/);

export function isValidEmail(value) {
  return EMAIL_REGEX.test(value);
}

export function isValidPassword(value) {
  return PASSWORD_REGEX.test(value);
}

export function isValidName(value) {
  return NAME_REGEX.test(value);
}
