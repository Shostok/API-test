import { useEffect, useState } from 'react';

import { getPosts } from '../../api/postApi';
import { Error } from '../Error/Error';
import { Loader } from '../Loader/Loader';
import { PostCard } from '../PostCard/PostCard';
import { SearchBar } from '../SearchBar/SearchBar';

import styles from './Posts.module.css';

export function Posts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleSearch = term => {
    if (!term.trim()) {
      setFilteredPosts(posts);
      return;
    }

    const filtered = posts.filter(
      post =>
        post.title.toLowerCase().includes(term.toLowerCase()) ||
        post.body.toLowerCase().includes(term.toLowerCase()),
    );
    setFilteredPosts(filtered);
  };

  const showList = !loading && !error && filteredPosts.length !== 0;
  const showEmpty = !loading && !error && filteredPosts.length === 0;

  return (
    <>
      <h1>Posts Information</h1>
      <SearchBar
        onSearch={handleSearch}
        placeholder="Search"
        searchType="posts"
      />
      {showEmpty && <p className={styles.emptyList}>No posts found</p>}
      <div className={styles.postContainer}>
        {showList &&
          filteredPosts.map(post => <PostCard {...post} key={post.id} />)}
        {loading && <Loader text="Loading..." />}
        {error && <Error error={error} hasButton={false} />}
      </div>
    </>
  );
}
