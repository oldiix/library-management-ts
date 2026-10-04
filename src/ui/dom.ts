export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className = '',
  text = '',
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text) {
    element.textContent = text;
  }
  return element;
}

export function createCard(title: string, content: HTMLElement): HTMLElement {
  const card = createElement('section', 'card shadow-sm mb-4');
  const body = createElement('div', 'card-body p-4');
  const heading = createElement('h2', 'h4 fw-bold mb-3', title);

  body.append(heading, content);
  card.append(body);
  return card;
}

export interface FormField {
  wrapper: HTMLDivElement;
  input: HTMLInputElement;
  error: HTMLDivElement;
}

export function createFormField(placeholder: string): FormField {
  const wrapper = createElement('div', 'mb-2');
  const input = createElement('input', 'form-control');
  const error = createElement('div', 'text-danger small mt-1');

  input.type = 'text';
  input.placeholder = placeholder;

  wrapper.append(input, error);
  return { wrapper, input, error };
}

export function showFieldError(field: FormField, message: string | null): void {
  field.error.textContent = message ?? '';
  field.input.classList.toggle('is-invalid', message !== null);
}
