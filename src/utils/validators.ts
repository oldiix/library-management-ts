export namespace Validation {
  export const MESSAGES = {
    required: "Це поле є обов'язковим",
    digitsOnly: 'Поле має містити тільки цифри',
    invalidYear: 'Введіть коректний рік (наприклад, 2008)',
  };

  const DIGITS_REGEX = /^\d+$/;

  const YEAR_REGEX = /^(1\d{3}|20\d{2})$/;

  export function isRequired(value: string): boolean {
    return value.trim() !== '';
  }

  export function isDigitsOnly(value: string): boolean {
    return DIGITS_REGEX.test(value.trim());
  }

  export function isValidYear(value: string): boolean {
    const year = value.trim();
    return YEAR_REGEX.test(year) && Number(year) <= new Date().getFullYear();
  }

  export function validateRequired(value: string): string | null {
    if (!isRequired(value)) {
      return MESSAGES.required;
    }
    return null;
  }

  export function validateUserId(value: string): string | null {
    if (!isRequired(value)) {
      return MESSAGES.required;
    }
    if (!isDigitsOnly(value)) {
      return MESSAGES.digitsOnly;
    }
    return null;
  }

  export function validateYear(value: string): string | null {
    if (!isRequired(value)) {
      return MESSAGES.required;
    }
    if (!isDigitsOnly(value)) {
      return MESSAGES.digitsOnly;
    }
    if (!isValidYear(value)) {
      return MESSAGES.invalidYear;
    }
    return null;
  }
}
