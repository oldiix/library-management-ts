import { Library } from './Library';
import { Storage } from './Storage';
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

  constructor() {
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

  private save(): void {
    this.storage.save(BOOKS_KEY, this.books.getAll());
    this.storage.save(USERS_KEY, this.users.getAll());
  }
}
