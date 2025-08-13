import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { Layout } from '../Layout/Layout';
import { NotFound } from '../NotFound/NotFound';
import { PostDetails } from '../PostDetails/PostDetail';
import { PostGenerate } from '../PostGenerate/PostGenerate';
import { Posts } from '../Posts/Posts';
import { UserDetails } from '../UserDetails/UserDetails';
import { Users } from '../Users/Users';

import styles from './App.module.css';
import { PostsProvider } from '../../contexts/PostProvider';

export function App() {
  const userId = '123'

  return (
    <div className={styles.app}>
      <PostsProvider uid={userId}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Users />} />
              <Route path="posts" element={<Posts />} />
              <Route path="posts/:id" element={<PostDetails />} />
              <Route path="postGenerate" element={<PostGenerate />} />
              <Route path="users/:id" element={<UserDetails />} />
              <Route path="404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PostsProvider>
    </div>
  );
}
