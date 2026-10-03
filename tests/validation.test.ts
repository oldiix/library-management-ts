import { expect } from 'chai';
import { Validation } from '../src/utils/validators';

describe('Validation', () => {
  describe("validateRequired() — обов'язкові поля", () => {
    it('повертає null для заповненого поля', () => {
      expect(Validation.validateRequired('Clean Code')).to.equal(null);
    });

    it('повертає помилку для порожнього поля', () => {
      expect(Validation.validateRequired('')).to.equal(Validation.MESSAGES.required);
    });

    it('повертає помилку для поля з самих пробілів', () => {
      expect(Validation.validateRequired('   ')).to.equal(Validation.MESSAGES.required);
    });
  });

  describe('validateUserId() — id користувача', () => {
    it('повертає null для id з цифр', () => {
      expect(Validation.validateUserId('1725533394038')).to.equal(null);
    });

    it('повертає помилку, якщо є не тільки цифри', () => {
      expect(Validation.validateUserId('12a')).to.equal(Validation.MESSAGES.digitsOnly);
    });

    it('повертає помилку для порожнього id', () => {
      expect(Validation.validateUserId('')).to.equal(Validation.MESSAGES.required);
    });
  });

  describe('validateYear() — рік видання', () => {
    it('повертає null для коректного року', () => {
      expect(Validation.validateYear('2008')).to.equal(null);
    });

    it('повертає помилку для порожнього поля', () => {
      expect(Validation.validateYear('')).to.equal(Validation.MESSAGES.required);
    });

    it('повертає помилку, якщо є не тільки цифри', () => {
      expect(Validation.validateYear('20a8')).to.equal(Validation.MESSAGES.digitsOnly);
    });

    it('повертає помилку для трицифрового числа', () => {
      expect(Validation.validateYear('999')).to.equal(Validation.MESSAGES.invalidYear);
    });

    it('повертає помилку для року з майбутнього', () => {
      const nextYear = String(new Date().getFullYear() + 1);
      expect(Validation.validateYear(nextYear)).to.equal(Validation.MESSAGES.invalidYear);
    });
  });
});
