import { IBook } from './interfaces/IBook';

export class Book implements IBook {
  private _id: number;
  private _title: string;
  private _author: string;
  private _year: number;
  private _borrowedBy: number | null;

  constructor(
    id: number,
    title: string,
    author: string,
    year: number,
    borrowedBy: number | null = null,
  ) {
    this._id = id;
    this._title = title;
    this._author = author;
    this._year = year;
    this._borrowedBy = borrowedBy;
  }

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get author(): string {
    return this._author;
  }

  get year(): number {
    return this._year;
  }

  get borrowedBy(): number | null {
    return this._borrowedBy;
  }

  get isBorrowed(): boolean {
    return this._borrowedBy !== null;
  }

  borrow(userId: number): void {
    this._borrowedBy = userId;
  }

  returnBook(): void {
    this._borrowedBy = null;
  }

  getLabel(): string {
    return `${this._title} by ${this._author} (${this._year})`;
  }

  toJSON(): IBook {
    return {
      id: this._id,
      title: this._title,
      author: this._author,
      year: this._year,
      borrowedBy: this._borrowedBy,
    };
  }

  static fromJSON(data: IBook): Book {
    return new Book(data.id, data.title, data.author, data.year, data.borrowedBy);
  }
}
