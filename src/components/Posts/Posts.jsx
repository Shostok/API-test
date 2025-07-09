import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { getPosts } from '../../api/postApi';
import { Error } from '../Error/Error';
import { Loader } from '../Loader/Loader';
import { Pagination } from '../Pagination/Pagination';
import { PostCard } from '../PostCard/PostCard';
import { SearchBar } from '../SearchBar/SearchBar';

import styles from './Posts.module.css';

export function Posts() {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const itemsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    getPosts()
      .then(({ data }) => {
        setPosts(data);
        const searchTerm = searchParams.get('search');
        if (searchTerm) {
          handleSearch(searchTerm, data);
        } else {
          setFilteredPosts(data);
        }
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      })
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSearch = (term, postsData = posts) => {
    if (!term.trim()) {
      setFilteredPosts(postsData);
      setTotalPages(Math.ceil(postsData.length / itemsPerPage));
      return;
    }

    const filtered = postsData.filter(
      post =>
        post.title.toLowerCase().includes(term.toLowerCase()) ||
        post.body.toLowerCase().includes(term.toLowerCase()),
    );
    setFilteredPosts(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  };

  const getPaginatedPosts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPosts.slice(startIndex, startIndex + itemsPerPage);
  };

  const showList = !loading && !error && filteredPosts.length !== 0;
  const showEmpty = !loading && !error && filteredPosts.length === 0;
  const paginatedPosts = getPaginatedPosts();

  return (
    <>
      <h1>Posts Information</h1>
      <SearchBar
        onSearch={handleSearch}
        placeholder="Search"
        searchType="posts"
      />
      <div className={styles.postContainer}>
        {showList &&
          paginatedPosts.map(post => <PostCard {...post} key={post.id} />)}
        {error && <Error error={error} hasButton={false} />}
      </div>
      {loading && <Loader text="Loading posts..." />}
      {showEmpty && <p>No posts found</p>}

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </>
  );
}
