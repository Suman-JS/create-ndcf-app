import {
  containsSpace,
  hasCapitalLetters,
  hasInvalidSequence,
  hasSpecialCharacters,
  isEmpty,
  isTooLong,
  isTooShort,
  startsWithNumber,
} from "./validationFunctions.js";
import { VALIDATION_MESSAGES } from "./validationMessages.js";

export const validationMap = [
  { check: isEmpty, message: VALIDATION_MESSAGES.empty },
  {
    check: hasSpecialCharacters,
    message: VALIDATION_MESSAGES.specialCharacters,
  },
  { check: hasInvalidSequence, message: VALIDATION_MESSAGES.invalidSequence },
  { check: hasCapitalLetters, message: VALIDATION_MESSAGES.capitalLetters },
  { check: startsWithNumber, message: VALIDATION_MESSAGES.numberStart },
  { check: containsSpace, message: VALIDATION_MESSAGES.containsSpace },
  { check: isTooShort, message: VALIDATION_MESSAGES.tooShort },
  { check: isTooLong, message: VALIDATION_MESSAGES.tooLong },
];
