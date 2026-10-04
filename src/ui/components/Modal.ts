import { Modal } from 'bootstrap';
import { Validation } from '../../utils/validators';
import { createElement, createFormField, showFieldError } from '../dom';

function openModal(parts: HTMLElement[], onHidden?: () => void): Modal {
  const element = createElement('div', 'modal fade');
  element.tabIndex = -1;

  const dialog = createElement('div', 'modal-dialog');
  const content = createElement('div', 'modal-content');
  content.append(...parts);
  dialog.append(content);
  element.append(dialog);
  document.body.append(element);

  const modal = new Modal(element);

  element.addEventListener('hidden.bs.modal', () => {
    modal.dispose();
    element.remove();
    onHidden?.();
  });

  modal.show();
  return modal;
}

function createButton(className: string, text: string, closesModal: boolean): HTMLButtonElement {
  const button = createElement('button', className, text);
  button.type = 'button';
  if (closesModal) {
    button.setAttribute('data-bs-dismiss', 'modal');
  }
  return button;
}

export function showMessageModal(message: string, buttonText: string): void {
  const body = createElement('div', 'modal-body', message);
  const footer = createElement('div', 'modal-footer');
  footer.append(createButton('btn btn-primary', buttonText, true));

  openModal([body, footer]);
}

export function showUserIdModal(onSave: (userId: number) => void): void {
  let savedUserId: number | null = null;

  const header = createElement('div', 'modal-header');
  header.append(
    createElement('h5', 'modal-title', 'Введіть ID користувача для позичення книги:'),
    createButton('btn-close', '', true),
  );

  const idField = createFormField('ID');
  const body = createElement('div', 'modal-body');
  body.append(idField.wrapper);

  const saveButton = createButton('btn btn-primary', 'Зберегти', false);
  const footer = createElement('div', 'modal-footer');
  footer.append(createButton('btn btn-secondary', 'Скасувати', true), saveButton);

  const modal = openModal([header, body, footer], () => {
    if (savedUserId !== null) {
      onSave(savedUserId);
    }
  });

  saveButton.addEventListener('click', () => {
    const error = Validation.validateUserId(idField.input.value);
    showFieldError(idField, error);

    if (error) {
      return;
    }

    savedUserId = Number(idField.input.value.trim());
    modal.hide();
  });
}
