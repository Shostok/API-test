import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from '../Layout/Layout';
import { NotFound } from '../NotFound/NotFound';
import { PostPage } from '../../pages/PostPage/PostPage';
import { Posts } from '../Posts/Posts';
import { Users } from '../Users/Users';
import styles from './App.module.css';
import { UserPage } from '../../pages/UserPage/UserPage';

export function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Users />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<PostPage />} />
            <Route path="/users/:id" element={<UserPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
