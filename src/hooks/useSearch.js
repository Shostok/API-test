import { useMemo, useState } from 'react';

import { POSTS_SEARCH_TYPE, USERS_SEARCH_TYPE } from '../constant/search';
import { stringToSearch } from '../utils/stringToSearch';

export const useSearch = (items, searchType) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = useMemo(() => {
    switch (searchType) {
      case POSTS_SEARCH_TYPE:
        return items.filter(
          post =>
            stringToSearch(post?.title, searchTerm) ||
            stringToSearch(post?.body, searchTerm),
        );
      case USERS_SEARCH_TYPE:
        return items.filter(
          user =>
            stringToSearch(user?.name, searchTerm) ||
            stringToSearch(user?.username, searchTerm) ||
            stringToSearch(user?.email, searchTerm),
        );
      default:
        return items;
    }
  }, [items, searchTerm, searchType]);

  return { items: filtered, search: setSearchTerm };
};
