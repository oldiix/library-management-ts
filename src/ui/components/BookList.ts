import { Book } from '../../models/Book';
import { createElement } from '../dom';

export function renderBookList(list: HTMLUListElement, books: Book[]): void {
  list.replaceChildren();

  for (const book of books) {
    const item = createElement(
      'li',
      'list-group-item d-flex justify-content-between align-items-center',
    );
    item.append(createElement('span', '', book.getLabel()));
    list.append(item);
  }
}
