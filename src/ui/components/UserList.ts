import { User } from '../../models/User';
import { createElement } from '../dom';

export function renderUserList(list: HTMLUListElement, users: User[]): void {
  list.replaceChildren();

  for (const user of users) {
    list.append(createElement('li', 'list-group-item', user.getLabel()));
  }
}
