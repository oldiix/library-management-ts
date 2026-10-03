import { expect } from 'chai';
import { Library } from '../src/services/Library';
import { Book } from '../src/models/Book';

describe('Library', () => {
  let library: Library<Book>;

  beforeEach(() => {
    library = new Library<Book>([
      new Book(1, 'Code Complete', 'Steve McConnell', 2004),
      new Book(2, 'Clean Code', 'Robert Martin', 2008),
    ]);
  });

  describe('add()', () => {
    it('додає книгу до колекції', () => {
      library.add(new Book(3, 'Refactoring', 'Martin Fowler', 1999));

      expect(library.getAll()).to.have.length(3);
      expect(library.findById(3)?.title).to.equal('Refactoring');
    });
  });

  describe('remove()', () => {
    it('видаляє книгу за id і повертає true', () => {
      const result = library.remove(1);

      expect(result).to.equal(true);
      expect(library.getAll()).to.have.length(1);
      expect(library.findById(1)).to.equal(undefined);
    });

    it('повертає false, якщо книги з таким id немає', () => {
      const result = library.remove(999);

      expect(result).to.equal(false);
      expect(library.getAll()).to.have.length(2);
    });
  });

  describe('findById()', () => {
    it('знаходить книгу за id', () => {
      const book = library.findById(2);

      expect(book?.title).to.equal('Clean Code');
    });

    it('повертає undefined, якщо книгу не знайдено', () => {
      expect(library.findById(999)).to.equal(undefined);
    });
  });

  describe('filter()', () => {
    it('знаходить книги за умовою', () => {
      const result = library.filter((book) => book.author.includes('Martin'));

      expect(result).to.have.length(1);
      expect(result[0].title).to.equal('Clean Code');
    });
  });
});
