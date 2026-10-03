import { Identifiable } from '../types';

export class Library<T extends Identifiable> {
  private items: T[];

  constructor(items: T[] = []) {
    this.items = items;
  }

  add(item: T): void {
    this.items.push(item);
  }

  remove(id: number): boolean {
    const lengthBefore = this.items.length;
    this.items = this.items.filter((item) => item.id !== id);
    return this.items.length < lengthBefore;
  }

  findById(id: number): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  filter(condition: (item: T) => boolean): T[] {
    return this.items.filter(condition);
  }

  getAll(): T[] {
    return [...this.items];
  }
}
