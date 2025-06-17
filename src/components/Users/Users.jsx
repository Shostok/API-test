import { useEffect, useState } from 'react';

import { getUsers } from '../../api/userApi';
import { Error } from '../Error/Error';
import { Loader } from '../Loader/Loader';
import { SearchBar } from '../SearchBar/SearchBar';
import { UserCard } from '../UserCard/UserCard';

import styles from './Users.module.css';

export function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers()
      .then(({ data }) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSearch = term => {
    if (!term.trim()) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter(
      user =>
        user.name.toLowerCase().includes(term.toLowerCase()) ||
        user.username.toLowerCase().includes(term.toLowerCase()) ||
        user.email.toLowerCase().includes(term.toLowerCase()),
    );
    setFilteredUsers(filtered);
  };

  const showList = !loading && !error && filteredUsers.length !== 0;
  const showEmpty = !loading && !error && filteredUsers.length === 0;

  return (
    <>
      <h1>Users Information</h1>
      <SearchBar
        onSearch={handleSearch}
        placeholder="Search"
        searchType="users"
      />
      <div className={styles.usersContainer}>
        {showList &&
          filteredUsers.map(user => <UserCard {...user} key={user.id} />)}
        {showEmpty && <p>No users found</p>}
        {loading && <Loader text="Loading..." />}
        {error && <Error error={error} hasButton={false} />}
      </div>
    </>
  );
}
