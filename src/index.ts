import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';

const app = document.getElementById('app');

if (app) {
    const title = document.createElement('h1');
    title.className = 'text-center my-4';
    title.textContent = 'Система Управління Бібліотекою';
    app.append(title);
}