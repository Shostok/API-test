import { useEffect, useState } from 'react';

import { getUsers } from '../../api/userApi';
import { USERS_SEARCH_TYPE } from '../../constant/search';
import { useSearch } from '../../hooks/useSearch';
import { Error } from '../Error/Error';
import { Loader } from '../Loader/Loader';
import { SearchBar } from '../SearchBar/SearchBar';
import { UserCard } from '../UserCard/UserCard';

import styles from './Users.module.css';

export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { items: filteredUsers, search: setSearchTerm } = useSearch(
    users,
    USERS_SEARCH_TYPE,
  );

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

  const showList = !loading && !error && filteredUsers.length !== 0;
  const showEmpty = !loading && !error && filteredUsers.length === 0;

  return (
    <>
      <h1>Users Information</h1>
      <SearchBar
        onSearch={setSearchTerm}
        placeholder="Search"
        searchType="users"
      />
      <div className={styles.usersContainer}>
        {showList &&
          filteredUsers.map(user => <UserCard {...user} key={user.id} />)}
        {error && <Error error={error} hasButton={false} />}
      </div>
      {loading && <Loader text="Loading..." />}
      {showEmpty && <p>No users found</p>}
    </>
  );
}
