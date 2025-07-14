import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router';

import styles from './Pagination.module.css';

export function Pagination({ currentPage, totalPages }) {
  // первый параметр не нужен, поэтому пропускаем вот так
  const [, setSearchParams] = useSearchParams();

  const handlePageChange = newPage => {
    if (newPage < 1 || newPage > totalPages) return;

    setSearchParams({ page: newPage });
  };

  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        aria-label="First page"
      >
        &laquo;&laquo;
      </button>

      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        &laquo;
      </button>

      <span className={styles.pageInfo}>
        Страница {currentPage} из {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        &raquo;
      </button>

      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Last page"
      >
        &raquo;&raquo;
      </button>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};
