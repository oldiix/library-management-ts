import { LibraryService } from '../services/LibraryService';
import { createBookForm } from './components/BookForm';
import { createUserForm } from './components/UserForm';
import { renderBookList } from './components/BookList';
import { renderUserList } from './components/UserList';
import { createCard, createElement } from './dom';

export function renderApp(root: HTMLElement, service: LibraryService): void {
  const bookList = createElement('ul', 'list-group list-group-flush');
  const userList = createElement('ul', 'list-group list-group-flush');

  const refreshLists = (): void => {
    renderBookList(bookList, service.getBooks());
    renderUserList(userList, service.getUsers());
  };

  const bookForm = createBookForm((title, author, year) => {
    service.addBook(title, author, year);
    refreshLists();
  });

  const userForm = createUserForm((name, email) => {
    service.addUser(name, email);
    refreshLists();
  });

  const container = createElement('div', 'container py-4');
  container.append(
    createElement('h1', 'text-center fw-bold mb-4', 'Система Управління Бібліотекою'),
    bookForm,
    userForm,
    createCard('Список Книг', bookList),
    createCard('Список Користувачів', userList),
  );

  root.append(container);
  refreshLists();
}
