import styles from './PostCard.module.css';

export function PostCard({ title, body, author }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      {author && <p className={styles.author}>Author: {author}</p>}
      <p className={styles.body}>{body}</p>
    </div>
  );
}
