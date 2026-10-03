import { Identifiable } from '../../types';

export interface IUser extends Identifiable {
  name: string;
  email: string;
  borrowedBookIds: number[];
}
