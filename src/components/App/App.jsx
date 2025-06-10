import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from '../Layout/Layout';
import { NotFound } from '../NotFound/NotFound';
import { PostDetails } from '../PostDetails/PostDetail';
import { Posts } from '../Posts/Posts';
import { UserDetails } from '../UserDetails/UserDetails';
import { Users } from '../Users/Users';
import styles from './App.module.css';

export function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Users />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
