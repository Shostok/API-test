import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import './user.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="App">
      <h1>Users Information</h1>
      <div className="users-container">
        {users.map(user => (
          <Link
            key={user.id}
            to={`/users/${user.id}`}
            className="user-card"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div>
              <h2>{user.name}</h2>
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Users;
