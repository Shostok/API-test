import styles from './NotFond.module.css';

export function NotFound() {
  return (
    <div style={styles.NotFound}>
      <h1>404 - Страница не найдена</h1>
      <p>Запрашиваемый URL не существует.</p>

      <Link to="/" style={styles.NotFoundLink}>
        Вернуться на главную страницу
      </Link>
    </div>
  );
}
