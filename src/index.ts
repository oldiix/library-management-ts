import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';
import { LibraryService } from './services/LibraryService';
import { renderApp } from './ui/render';

const root = document.getElementById('app');

if (root) {
  renderApp(root, new LibraryService());
}
