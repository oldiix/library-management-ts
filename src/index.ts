import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';
import { LibraryService } from './services/LibraryService';
import { NotificationService } from './services/NotificationService';
import { showMessageModal } from './ui/components/Modal';
import { renderApp } from './ui/render';

const root = document.getElementById('app');

if (root) {
  const notifications = new NotificationService(showMessageModal);
  renderApp(root, new LibraryService(notifications));
}
