import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { getPosts } from '../../api/postApi';
import { Error } from '../Error/Error';
import { Loader } from '../Loader/Loader';
import { PostCard } from '../PostCard/PostCard';
import { SearchBarPost } from '../SearchBar/Search';

import styles from './Posts.module.css';

export function Posts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const postQuery = searchParams.get('post') || '';

  useEffect(() => {
    getPosts()
      .then(({ data }) => {
        setPosts(data);
        setFilteredPosts(data);
      })
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (postQuery) {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(postQuery.toLowerCase()),
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [postQuery, posts]);

  const showList = !loading && !error && filteredPosts.length !== 0;
  const showEmpty =
    !loading && !error && filteredPosts.length === 0 && postQuery;

  return (
    <>
      <h1>Posts Information</h1>
      <SearchBarPost />
      <div className={styles.postContainer}>
        {showList &&
          filteredPosts.map(post => <PostCard {...post} key={post.id} />)}
        {showEmpty && <p>No posts found matching your search</p>}
        {loading && <Loader text="Loading..." />}
        {error && <Error error={error} hasButton={false} />}
      </div>
    </>
  );
}
