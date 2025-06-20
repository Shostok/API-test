import { useState } from 'react';

import { Button } from '../Button/Button';

import styles from './SearchBar.module.css';
export const SearchBar = ({
  onSearch,
  placeholder = 'Search...',
  searchType = 'users',
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = e => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={`${placeholder} ${searchType}...`}
        className={styles.searchInput}
      />
      <Button>Search</Button>
    </form>
  );
};
