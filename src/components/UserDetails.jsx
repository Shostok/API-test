import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import './user.css';

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`,
        );
        if (!response.data) {
          throw new Error('User data is empty');
        }
        setUser(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading user data...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <Link to="/" className="back-link">
          Return to Users List
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="error">
        <p>User not found</p>
        <Link to="/" className="back-link">
          Return to Users List
        </Link>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>User Details</h1>
      <div className="user-details">
        <h2>{user.name}</h2>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Website:</strong> {user.website}
        </p>

        <h3>Address</h3>
        <p>
          {user.address.street}, {user.address.suite}
        </p>
        <p>
          {user.address.city}, {user.address.zipcode}
        </p>

        <h3>Company</h3>
        <p>
          <strong>Name:</strong> {user.company.name}
        </p>
        <p>
          <strong>Catchphrase:</strong> {user.company.catchPhrase}
        </p>
        <p>
          <strong>BS:</strong> {user.company.bs}
        </p>

        <Link to="/" className="back-link">
          Back to Users List
        </Link>
      </div>
    </div>
  );
}

export default UserDetails;
