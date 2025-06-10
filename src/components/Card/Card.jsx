import { Link } from 'react-router';
import styles from './Card.module.css';

export const Card = ({ children, href }) => {
  return (
    <Link
      to={href}
      className={styles.card}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      {children}
    </Link>
  );
}