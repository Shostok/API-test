import { Link } from 'react-router';

import styles from './PostCard.module.css';

export const PostCard = ({ id, title, body, author }) => {
  return (
    <Link
      to={`/posts/${id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className={styles.card}>
        <h2 className={styles.title}>{title}</h2>
        {author && <p className={styles.author}>Author: {author}</p>}
        <p>{body || 'No content'}</p>
      </div>
    </Link>
  );
};
