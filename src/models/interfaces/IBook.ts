import { Identifiable } from '../../types';

export interface IBook extends Identifiable {
  title: string;
  author: string;
  year: number;
  borrowedBy: number | null;
}
