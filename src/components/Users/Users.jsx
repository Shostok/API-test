import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { getUsers } from '../../api/userApi';
import { Error } from '../Error/Error';
import { Loader } from '../Loader/Loader';
import { Pagination } from '../Pagination/Pagination';
import { SearchBar } from '../SearchBar/SearchBar';
import { UserCard } from '../UserCard/UserCard';

import styles from './Users.module.css';

export function Users() {
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const itemsPerPage = 5;

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then(({ data }) => {
        setUsers(data);
        const searchTerm = searchParams.get('search');
        if (searchTerm) {
          handleSearch(searchTerm, data);
        } else {
          setFilteredUsers(data);
        }
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      })
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSearch = (term, usersData = users) => {
    if (!term.trim()) {
      setFilteredUsers(usersData);
      setTotalPages(Math.ceil(usersData.length / itemsPerPage));
      return;
    }

    const filtered = usersData.filter(
      user =>
        user.name.toLowerCase().includes(term.toLowerCase()) ||
        user.username.toLowerCase().includes(term.toLowerCase()) ||
        user.email.toLowerCase().includes(term.toLowerCase()),
    );
    setFilteredUsers(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  };

  const getPaginatedUsers = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  };

  const showList = !loading && !error && filteredUsers.length !== 0;
  const showEmpty = !loading && !error && filteredUsers.length === 0;
  const paginatedUsers = getPaginatedUsers();

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
          paginatedUsers.map(user => <UserCard {...user} key={user.id} />)}
        {error && <Error error={error} hasButton={false} />}
      </div>
      {loading && <Loader text="Loading..." />}
      {showEmpty && <p>No users found</p>}

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </>
  );
}
