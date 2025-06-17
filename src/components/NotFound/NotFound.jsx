import { Link } from 'react-router';

import styles from './NotFound.module.css';

export function NotFound() {
  return (
    <div className={styles.NotFound}>
      <h1>404 - Страница не найдена</h1>
      <p>Запрашиваемый URL не существует.</p>

      <Link to="/" className={styles.NotFoundLink}>
        Вернуться на главную страницу
      </Link>
    </div>
  );
}
