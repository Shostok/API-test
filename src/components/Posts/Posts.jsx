import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { getPosts } from '../../api/postApi';
import { getUsers } from '../../api/userApi';
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
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const itemsPerPage = 10;

  const postsWithAuthors = useMemo(() => {
    return posts.map(post => {
      const author = users.find(user => user.id === post.userId);
      return {
        ...post,
        author: author
          ? `${author.name} (${author.username})`
          : 'Unknown author',
      };
    });
  }, [posts, users]);

  const { items: filteredPosts, search: setSearchTerm } = useSearch(
    postsWithAuthors,
    POSTS_SEARCH_TYPE,
  );
  const totalPages = useMemo(() => {
    return Math.ceil(filteredPosts.length / itemsPerPage);
  }, [filteredPosts, itemsPerPage]);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPosts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPosts, currentPage, itemsPerPage]);

  const handlePostClick = postId => {
    navigate(`/posts/${postId}`);
  };

  useEffect(() => {
    setLoading(true);

    Promise.all([getPosts(), getUsers()])
      .then(([postsData, usersData]) => {
        setPosts(postsData.data);
        setUsers(usersData.data);
      })
      .catch(error => {
        console.error('Error loading data:', error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const showList = !loading && !error && filteredPosts.length > 0;
  const showEmpty = !loading && !error && filteredPosts.length === 0;

  return (
    <div className={styles.container}>
      <h1>Posts Information</h1>

      <SearchBar
        onSearch={setSearchTerm}
        placeholder="Search"
        searchType="posts"
      />

      <div className={styles.postsGrid}>
        {showList &&
          paginatedPosts.map(post => (
            <div
              key={post.id}
              className={styles.postCardWrapper}
              onClick={() => handlePostClick(post.id)}
              onKeyDown={e => e.key === 'Enter' && handlePostClick(post.id)}
              role="button"
              tabIndex={0}
              aria-label={`View post: ${post.title}`}
            >
              <PostCard
                key={post.id}
                title={post.title}
                body={post.body}
                author={post.author}
              />
            </div>
          ))}
      </div>

      {loading && <Loader text="Loading posts..." />}
      {error && <Error error={error} hasButton={false} />}
      {showEmpty && <p className={styles.noResults}>No posts found</p>}

      {totalPages > 1 && (
        <div className={styles.paginationContainer}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={page => {
              const params = new URLSearchParams(searchParams);
              params.set('page', page);
              navigate(`?${params.toString()}`);
            }}
          />
        </div>
      )}
    </div>
  );
}
