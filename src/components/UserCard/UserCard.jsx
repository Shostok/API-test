import { Card } from '../Card/Card';
import styles from './UserCard.module.css';

export const UserCard = ({ id, name, username, email }) => {
  return (
    <Card href={`/users/${id}`}>
      <div className={styles.userCard}>
        {name && <h2>{name}</h2>}
        {username && (
          <p>
            <strong>Username:</strong> {username}
          </p>
        )}

        {email && (
          <p>
            <strong>Email:</strong> {email}
          </p>
        )}
      </div>
    </Card>
  );
};
