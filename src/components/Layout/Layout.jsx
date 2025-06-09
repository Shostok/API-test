import { Link, Outlet } from 'react-router';
import styles from './header.module.css';

export const Layout = () => {
  return (
    <>
      <header className={styles.header}>
        <Link to="/">Users</Link>
        <Link to="/posts">Posts</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
