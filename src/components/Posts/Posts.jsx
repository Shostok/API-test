import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';

import { getPosts } from '../../api/postApi';
import { POSTS_SEARCH_TYPE } from '../../constant/search';
import { useSearch } from '../../hooks/useSearch';
import { Error } from '../Error/Error';
import { Loader } from '../Loader/Loader';
import { Pagination } from '../Pagination/Pagination';
import { PostCard } from '../PostCard/PostCard';
import { SearchBar } from '../SearchBar/SearchBar';

import styles from './Posts.module.css';

export function Posts() {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const itemsPerPage = 10;

  const { items: filteredPosts, search: setSearchTerm } = useSearch(
    posts,
    POSTS_SEARCH_TYPE,
  );

  const totalPages = useMemo(() => {
    return Math.ceil(filteredPosts.length / itemsPerPage);
  }, [filteredPosts, itemsPerPage]);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPosts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPosts, currentPage, itemsPerPage]);

  const handlePageChange = newPage => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage);
    window.history.pushState(null, '', `?${newSearchParams.toString()}`);
    window.location.reload();
  };

  useEffect(() => {
    setLoading(true);
    getPosts()
      .then(({ data }) => {
        setPosts(data);
        const searchTerm = searchParams.get('search');
        if (searchTerm) {
          setSearchTerm(searchTerm);
        }
      })
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchParams, setSearchTerm]);

  const showList = !loading && !error && filteredPosts.length > 0;
  const showEmpty = !loading && !error && filteredPosts.length === 0;

  return (
    <>
      <h1>Posts Information</h1>
      <SearchBar
        onSearch={setSearchTerm}
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
        <div className={styles.paginationWrapper}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <div className={styles.pageInfo}>
            Страница {currentPage} из {totalPages}
          </div>
        </div>
      )}
    </>
  );
}
