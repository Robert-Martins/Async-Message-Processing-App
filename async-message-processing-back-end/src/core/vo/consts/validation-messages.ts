import { ValidationArguments } from "class-validator";

export const provideIsStringValidationMessage = (
  validationArguments: string | ValidationArguments,
): string => {
  return `${getPropertyFromParameter(validationArguments)} deve ser um texto`;
};

export const provideIsNotEmptyValidationMessage = (
  validationArguments: string | ValidationArguments,
): string => {
  return `${getPropertyFromParameter(validationArguments)} não pode ser vazio`;
};

export const provideIsNotEmptyStringValidationMessage = (
  validationArguments: string | ValidationArguments,
): string => {
  return `${getPropertyFromParameter(validationArguments)} não pode ser um texto em branco`;
};

export const provideIsUUIDValidationMessage = (
  validationArguments: string | ValidationArguments,
): string => {
  return `${getPropertyFromParameter(validationArguments)} deve ser um UUID válido`;
};

const getPropertyFromParameter = (
  validationArguments: ValidationArguments | string,
): string => {
  return typeof validationArguments === 'string'
    ? validationArguments
    : validationArguments.property;
};