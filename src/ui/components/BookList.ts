import { Book } from '../../models/Book';
import { createElement } from '../dom';

export function renderBookList(
  list: HTMLUListElement,
  books: Book[],
  onBorrow: (bookId: number) => void,
  onReturn: (bookId: number) => void,
): void {
  list.replaceChildren();

  for (const book of books) {
    const item = createElement(
      'li',
      'list-group-item d-flex justify-content-between align-items-center',
    );

    const button = book.isBorrowed
      ? createElement('button', 'btn btn-warning btn-sm', 'Повернути')
      : createElement('button', 'btn btn-primary btn-sm', 'Позичити');
    button.type = 'button';

    button.addEventListener('click', () => {
      if (book.isBorrowed) {
        onReturn(book.id);
      } else {
        onBorrow(book.id);
      }
    });

    item.append(createElement('span', '', book.getLabel()), button);
    list.append(item);
  }
}
