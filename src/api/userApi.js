import axios from "axios"
import { API_URL } from "../constants/api"


export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`)

  return response
}

export const getUser = async (id) => {
  const response = await axios.get(`${API_URL}/users/${id}`);


  if (!response.data) {
    throw new Error('User data is empty');
  }

  return response
}