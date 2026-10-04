import { Validation } from '../../utils/validators';
import { createCard, createElement, createFormField, showFieldError } from '../dom';

export function createUserForm(onSubmit: (name: string, email: string) => void): HTMLElement {
  const nameField = createFormField("Ім'я");
  const emailField = createFormField('Email');
  const button = createElement('button', 'btn btn-success', 'Додати Користувача');
  button.type = 'submit';

  const form = createElement('form');
  form.noValidate = true;
  form.append(nameField.wrapper, emailField.wrapper, button);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameError = Validation.validateRequired(nameField.input.value);
    const emailError = Validation.validateRequired(emailField.input.value);

    showFieldError(nameField, nameError);
    showFieldError(emailField, emailError);

    if (nameError || emailError) {
      return;
    }

    onSubmit(nameField.input.value.trim(), emailField.input.value.trim());
    form.reset();
  });

  return createCard('Додати Користувача', form);
}
