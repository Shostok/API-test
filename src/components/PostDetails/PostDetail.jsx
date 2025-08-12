import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { getPost } from '../../api/postApi';
import { getUser } from '../../api/userApi';
import { Button } from '../Button/Button';
import { Error } from '../Error/Error';
import { Loader } from '../Loader/Loader';

import styles from './PostDetail.module.css';

export function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleBackClick = () => {
    navigate('/posts');
  };

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    getPost(id)
      .then(postResponse => {
        if (!postResponse.data.userId) {
          throw new Error('Post has no author ID');
        }

        return Promise.all([
          Promise.resolve(postResponse.data),
          getUser(postResponse.data.userId),
        ]);
      })
      .then(([postData, userResponse]) => {
        setPost(postData);
        setAuthor(userResponse.data || null);
      })
      .catch(err => {
        setError(err.message || 'Failed to fetch data');
        setPost(null);
        setAuthor(null);
      })
      .finally(() => {
        setLoading(false);
      });
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

        {author && (
          <p className={styles.author}>
            Author: {author.name} ({author.username})
          </p>
        )}

        <p style={{ marginBottom: '20px' }}>{post.body}</p>

        <Button onClick={handleBackClick}>Back to posts List</Button>
      </div>
    </>
  );
}
