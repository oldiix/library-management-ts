import { IUser } from './interfaces/IUser';
import { MAX_BORROWED_BOOKS } from '../types';

export class User implements IUser {
  private _id: number;
  private _name: string;
  private _email: string;
  private _borrowedBookIds: number[];

  constructor(id: number, name: string, email: string, borrowedBookIds: number[] = []) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._borrowedBookIds = borrowedBookIds;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get borrowedBookIds(): number[] {
    return [...this._borrowedBookIds];
  }

  canBorrow(): boolean {
    return this._borrowedBookIds.length < MAX_BORROWED_BOOKS;
  }

  addBook(bookId: number): void {
    this._borrowedBookIds.push(bookId);
  }

  removeBook(bookId: number): void {
    this._borrowedBookIds = this._borrowedBookIds.filter((id) => id !== bookId);
  }

  getLabel(): string {
    return `${this._id} ${this._name} (${this._email})`;
  }

  toJSON(): IUser {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      borrowedBookIds: this._borrowedBookIds,
    };
  }

  static fromJSON(data: IUser): User {
    return new User(data.id, data.name, data.email, data.borrowedBookIds);
  }
}
