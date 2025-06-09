import { useEffect, useState } from 'react';
import { getUsers } from '../../api/userApi';
import { Loader } from '../Loader/Loader';
import { UserCard } from '../UserCard/UserCard';
import styles from './Users.module.css';

export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const showList = !loading && !error && users.length !== 0;

  useEffect(() => {
    getUsers()
      .then(({ data }) => {
        setUsers(data);
      })
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1>Users Information</h1>
      <div className={styles.usersContainer}>
        {showList && users.map(user => <UserCard {...user} key={user.id} />)}
        {loading && <Loader text="Loading  ..." />}
        {error && <Error error={error} hasButton={false} />}
      </div>
    </>
  );
}
