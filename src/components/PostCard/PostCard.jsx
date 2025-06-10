import { Card } from '../Card/Card';
import styles from './PostCard.module.css';



export const PostCard = ({ id, title, body }) => {
  return (
    <Card href={`/posts/${id}`}>
      <div className={styles.postCard}>
        <h2>{title}</h2>
        <p>{body || 'No content'}</p>
      </div>
    </Card>
  );
};  
