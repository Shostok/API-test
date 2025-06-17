import { Link } from 'react-router';

import styles from './PostCard.module.css';

export const PostCard = ({ id, title, body }) => {
  return (
    <Link
      key={id}
      to={`/posts/${id}`}
      className={styles.postCard}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div>
        <h2>{title}</h2>
        <p>{body || 'No content'}</p>
      </div>
    </Link>
  );
};
