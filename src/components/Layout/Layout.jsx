import { Link, Outlet } from 'react-router';
import styles from './header.module.css';

export const Layout = () => {
  return (
    <>
      <header className={styles.header}>
        <Link className={styles.Link} to="/">
          Users
        </Link>
        <Link className={styles.Link} to="/posts">
          Posts
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
