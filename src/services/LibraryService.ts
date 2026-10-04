import { Library } from './Library';
import { Storage } from './Storage';
import { NotificationService } from './NotificationService';
import { Book } from '../models/Book';
import { User } from '../models/User';
import { IBook } from '../models/interfaces/IBook';
import { IUser } from '../models/interfaces/IUser';
import { generateId } from '../utils/idGenerator';

const BOOKS_KEY = 'library-books';
const USERS_KEY = 'library-users';

export class LibraryService {
  private books: Library<Book>;
  private users: Library<User>;
  private storage = new Storage();
  private notifications: NotificationService;

  constructor(notifications: NotificationService) {
    this.notifications = notifications;

    const savedBooks = this.storage.load<IBook[]>(BOOKS_KEY) ?? [];
    const savedUsers = this.storage.load<IUser[]>(USERS_KEY) ?? [];

    this.books = new Library<Book>(savedBooks.map((data) => Book.fromJSON(data)));
    this.users = new Library<User>(savedUsers.map((data) => User.fromJSON(data)));
  }

  getBooks(): Book[] {
    return this.books.getAll();
  }

  getUsers(): User[] {
    return this.users.getAll();
  }

  addBook(title: string, author: string, year: number): void {
    this.books.add(new Book(generateId(), title, author, year));
    this.save();
  }

  addUser(name: string, email: string): void {
    this.users.add(new User(generateId(), name, email));
    this.save();
  }

  borrowBook(bookId: number, userId: number): void {
    const book = this.books.findById(bookId);
    const user = this.users.findById(userId);

    if (!book || book.isBorrowed) {
      return;
    }
    if (!user) {
      this.notifications.userNotFound(userId);
      return;
    }
    if (!user.canBorrow()) {
      this.notifications.limitReached(user);
      return;
    }

    book.borrow(user.id);
    user.addBook(book.id);
    this.save();
    this.notifications.bookBorrowed(book, user);
  }

  returnBook(bookId: number): void {
    const book = this.books.findById(bookId);

    if (!book || book.borrowedBy === null) {
      return;
    }

    const user = this.users.findById(book.borrowedBy);
    user?.removeBook(book.id);
    book.returnBook();
    this.save();
    this.notifications.bookReturned(book);
  }

  private save(): void {
    this.storage.save(BOOKS_KEY, this.books.getAll());
    this.storage.save(USERS_KEY, this.users.getAll());
  }
}
