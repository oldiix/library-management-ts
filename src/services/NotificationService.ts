import { Book } from '../models/Book';
import { User } from '../models/User';
import { MAX_BORROWED_BOOKS } from '../types';

export type ShowMessage = (message: string, buttonText: string) => void;

export class NotificationService {
  private show: ShowMessage;

  constructor(show: ShowMessage) {
    this.show = show;
  }

  bookBorrowed(book: Book, user: User): void {
    this.show(`${book.getLabel()} has been borrowed by ${user.getLabel()}.`, 'Зрозуміло!');
  }

  bookReturned(book: Book): void {
    this.show(`${book.getLabel()} has been returned.`, 'Закрити');
  }

  limitReached(user: User): void {
    this.show(
      `Користувач ${user.name} не може позичити більше ${MAX_BORROWED_BOOKS} книг.`,
      'Зрозуміло!',
    );
  }

  userNotFound(userId: number): void {
    this.show(`Користувача з ID ${userId} не знайдено.`, 'Закрити');
  }
}
