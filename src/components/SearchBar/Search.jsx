import { useState } from 'react';
import { useSearchParams } from 'react-router';

export const SearchBarPost = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get('post') || '',
  );

  const handleSubmit = e => {
    e.preventDefault();
    setSearchParams({ post: searchValue });
  };

  const handleChange = e => {
    setSearchValue(e.target.value);
    if (e.target.value === '') {
      setSearchParams({});
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <input
        type="search"
        name="search"
        value={searchValue}
        onChange={handleChange}
        placeholder="Search posts..."
      />
      <input type="submit" value="Search" />
    </form>
  );
};
