import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getUser } from '../../api/userApi';
import { Button } from '../Button/Button';
import { Error } from '../Error/Error';
import { Loader } from '../Loader/Loader';
import styles from './UserDetails.module.css';

export function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleBackClick = () => {
    navigate('/')
  }

  useEffect(() => {
    if (id) {
      getUser(id)
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => {
          setError(err.message || 'Failed to fetch user data');
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }, [id]);

  if (loading) {
    return <Loader text='Loading user data...' />
  }

  if (error) {
    return <Error error={error} buttonText='Return to Users List' onClick={handleBackClick} hasButton />
  }

  if (!user) {
    return (
      <Error error="User not found" buttonText='Return to Users List' onClick={handleBackClick} hasButton />
    );
  }

  return (
    <>
      <h1>User Details</h1>
      <div className={styles.userDetails}>
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

        <Button onClick={handleBackClick}>
          Back to Users List
        </Button>
      </div>
    </>
  );
}
