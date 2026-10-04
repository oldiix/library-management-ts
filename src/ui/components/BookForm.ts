import { Validation } from '../../utils/validators';
import { createCard, createElement, createFormField, showFieldError } from '../dom';

export function createBookForm(
  onSubmit: (title: string, author: string, year: number) => void,
): HTMLElement {
  const titleField = createFormField('Назва книги');
  const authorField = createFormField('Автор');
  const yearField = createFormField('Рік видання');
  const button = createElement('button', 'btn btn-success', 'Додати Книгу');
  button.type = 'submit';

  const form = createElement('form');
  form.noValidate = true;
  form.append(titleField.wrapper, authorField.wrapper, yearField.wrapper, button);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const titleError = Validation.validateRequired(titleField.input.value);
    const authorError = Validation.validateRequired(authorField.input.value);
    const yearError = Validation.validateYear(yearField.input.value);

    showFieldError(titleField, titleError);
    showFieldError(authorField, authorError);
    showFieldError(yearField, yearError);

    if (titleError || authorError || yearError) {
      return;
    }

    onSubmit(
      titleField.input.value.trim(),
      authorField.input.value.trim(),
      Number(yearField.input.value.trim()),
    );
    form.reset();
  });

  return createCard('Додати Книгу', form);
}
