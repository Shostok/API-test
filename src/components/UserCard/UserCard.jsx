import { Link } from 'react-router'
import styles from './UserCard.module.css'

export const UserCard = ({ id, name, username, email }) => {
  return (
    <Link
      key={id}
      to={`/users/${id}`}
      className={styles.userCard}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div>
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
    </Link>
  )
}