import axios from 'axios';
import { API_URL } from '../constants/api';

export const getPosts = async () => {
  const response = await axios.get(`${API_URL}/posts`);

  return response;
};

export const getPost = async id => {
  const response = await axios.get(`${API_URL}/posts/${id}`);

  if (!response.data) {
    throw new Error('Post data is empty');
  }

  return response;
};
