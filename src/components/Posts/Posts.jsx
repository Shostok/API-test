import { useEffect, useState } from 'react';

import { getPosts } from '../../api/postApi';
import { Error } from '../Error/Error';
import { Loader } from '../Loader/Loader';
import { PostCard } from '../PostCard/PostCard';
import { SearchBar } from '../SearchBar/SearchBar';
import { useSearch } from '../../hooks/useSearch';

import styles from './Posts.module.css';

export function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // достаем наши приколы из хука
  const { items, search } = useSearch(posts, 'posts');

  useEffect(() => {
    getPosts()
      .then(({ data }) => {
        setPosts(data);
      })
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSearch = term => {
    // используем функцию для поиска из хука
    search(term);
  };

  // везде используем отфилььтрованный массив
  const showList = !loading && !error && items.length !== 0;
  const showEmpty = !loading && !error && items.length === 0;

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
        {showList && items.map(post => <PostCard {...post} key={post.id} />)}
        {loading && <Loader text="Loading..." />}
        {error && <Error error={error} hasButton={false} />}
      </div>
    </>
  );
}
