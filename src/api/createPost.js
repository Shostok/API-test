import axios from 'axios';

import { API_URL } from '../constant/api';

export const createPost = async postData => {
  try {
    const response = await axios.post(`${API_URL}/posts`, postData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};
