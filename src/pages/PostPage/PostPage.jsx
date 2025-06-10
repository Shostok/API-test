import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import styles from './PostPage.module.css';
import { getPost } from '../../api/postApi';
import { Loader } from '../../components/Loader/Loader';
import { Error } from '../../components/Error/Error';
import { Button } from '../../components/Button/Button';

export function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleBackClick = () => {
    navigate('/posts');
  };

  useEffect(() => {
    if (id) {
      getPost(id)
        .then(response => {
          setPost(response.data);
        })
        .catch(err => {
          setError(err.message || 'Failed to fetch user data');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <Loader text="Loading post data..." />;
  }

  if (error) {
    return (
      <Error
        error={error}
        buttonText="Return to Posts List"
        onClick={handleBackClick}
        hasButton
      />
    );
  }

  if (!post) {
    return (
      <Error
        error="Post not found"
        buttonText="Return to Posts List"
        onClick={handleBackClick}
        hasButton
      />
    );
  }

  return (
    <>
      <h1>Post Details</h1>
      <div className={styles.postsDetails}>
        <h2>
          Title: <br /> {post.title}
        </h2>

        <p>{post.body}</p>

        <Button onClick={handleBackClick}>Back to posts List</Button>
      </div>
    </>
  );
}
