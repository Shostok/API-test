import axios from 'axios';
import { useEffect } from 'react';
import './App.css';

function App() {
  const API_URL = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    API_URL();
  }, []);

  return <></>;
}

export default App;
