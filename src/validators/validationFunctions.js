import {
  CAPITAL_LETTER_REGEX,
  INVALID_SEQUENCE_REGEX,
  NUMBER_START_REGEX,
  SPACE_REGEX,
  SPECIAL_CHARACTERS_REGEX,
} from "./regex.js";

const MIN_LENGTH = 3;
const MAX_LENGTH = 255;

export const isEmpty = (value) => !value.length;
export const hasSpecialCharacters = (value) =>
  SPECIAL_CHARACTERS_REGEX.test(value);
export const hasInvalidSequence = (value) => INVALID_SEQUENCE_REGEX.test(value);
export const hasCapitalLetters = (value) => CAPITAL_LETTER_REGEX.test(value);
export const startsWithNumber = (value) => NUMBER_START_REGEX.test(value);
export const containsSpace = (value) => SPACE_REGEX.test(value);
export const isTooShort = (value) => value.length < MIN_LENGTH;
export const isTooLong = (value) => value.length > MAX_LENGTH;
