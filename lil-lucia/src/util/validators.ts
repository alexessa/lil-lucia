const VALIDATOR_TYPE_REQUIRE: string = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH: string = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH: string = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN: string = 'MIN';
const VALIDATOR_TYPE_MAX: string = 'MAX';
const VALIDATOR_TYPE_EMAIL: string = 'EMAIL';
const VALIDATOR_TYPE_FILE: string = 'FILE';

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val: number) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val
});
export const VALIDATOR_MAXLENGTH = (val: number) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val
});
export const VALIDATOR_MIN = (val: number) => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = (val: number) => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });

export const validate = (value: string, validators: {type: string, val: string | number}[]) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= (validator.val as number);
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= (validator.val as number);
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= (validator.val as number);
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= (validator.val as number);
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
  }
  return isValid;
};
