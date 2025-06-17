import { useMemo, useState } from 'react';

export const useSearch = (items, searchType) => {
  // заводим состояние
  const [searchTerm, setSearchTerm] = useState('');

  // мемоизируем отфильтрованный массив
  const filtered = useMemo(() => {
    // в зависимости от типа поиска фильтруем массив
    switch (searchType) {
      case 'posts':
        return items.filter(
          post =>
            post?.title
              .toLowerCase()
              .includes(searchTerm.toLowerCase().trim()) ||
            post?.body.toLowerCase().includes(searchTerm.toLowerCase().trim()),
        );
      case 'users':
        return items.filter(
          user =>
            user?.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase().trim()) ||
            user?.username
              .toLowerCase()
              .includes(searchTerm.toLowerCase().trim()) ||
            user?.email.toLowerCase().includes(searchTerm.toLowerCase().trim()),
        );
      default:
        // если тип поиска не определен, возвращаем исходный массив
        return items;
    }
  }, [items, searchTerm, searchType]);

  // возвращаем отфильтрованный мемоизированный массив и функцию для установки поиска
  return { items: filtered, search: setSearchTerm };
};
