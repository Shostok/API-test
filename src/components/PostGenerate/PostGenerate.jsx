import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { API_URL } from '../../constant/api';
import { Button } from '../Button/Button';

import styles from './PostGenerate.module.css';
import { usePosts } from '../../contexts/usePosts';

export function PostGenerate({ onPostCreated }) {
  const { posts, setPosts } = usePosts()

  // console.log(posts, 'посты в PostGenerate')

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/posts');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/posts`, {
        title,
        body: content,
        userId: 1,
      });

      const newPost = {
        id: response.data.id,
        title: response.data.title,
        body: response.data.body,
        userId: 1,
        createdAt: new Date().toISOString(),
      };



      setPosts((prev) => {
        console.log([...prev, newPost], 'list')

        return [...prev, newPost]
      })
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.postForm} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.postTitle}
          placeholder="Title"
          maxLength="20"
          required
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          maxLength="250"
          className={styles.postContent}
          placeholder="Post Text"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <div className={styles.buttonGroup}>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setTitle('');
              setContent('');
              handleBackClick();
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  );
}
