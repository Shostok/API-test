import { useEffect, useState } from 'react';
import { getPosts } from '../../api/postApi';
import { Error } from '../Error/Error';
import { Loader } from '../Loader/Loader';
import { PostCard } from '../PostCard/PostCard';
import styles from './Posts.module.css';

export function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const showList = !loading && !error && posts.length !== 0;

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

  return (
    <>
      <h1>Posts Information</h1>
      <div className={styles.postContainer}>
        {showList && posts.map(post => <PostCard {...post} key={post.id} />)}
        {loading && <Loader text="Loading..." />}
        {error && <Error error={error} hasButton={false} />}
      </div>
    </>
  );
}
