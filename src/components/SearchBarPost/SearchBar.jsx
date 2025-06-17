import { useState } from 'react';

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
    onSearch(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(searchTerm);
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
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
};
