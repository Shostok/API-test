import { useContext } from 'react';

import { PostsContext } from './PostProvider';

export function usePosts() {
  const context = useContext(PostsContext);

  if (!context) {
    throw new Error('usePosts must be within PostsProvider');
  }

  return context;
}
