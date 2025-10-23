export const EMAIL_REGEX = new RegExp(/^\S+@\S+\.\S+$/);
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/
);
export const NAME_REGEX = new RegExp(/^[A-Za-zА-Яа-яЁё]+$/);

export const isEmail = (value: string): boolean => {
  return EMAIL_REGEX.test(value);
};

export const isPassword = (value: string): boolean => {
  return PASSWORD_REGEX.test(value);
};

export const isName = (value: string): boolean => {
  return NAME_REGEX.test(value);
};
