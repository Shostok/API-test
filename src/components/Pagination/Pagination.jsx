import { useSearchParams } from 'react-router';

import styles from './Pagination.module.css';

export function Pagination({ currentPage, totalPages }) {
  const [, setSearchParams] = useSearchParams();

  const handlePageChange = newPage => {
    if (newPage < 1 || newPage > totalPages) return;
    setSearchParams({ page: newPage });
  };

  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = startPage + maxVisible - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      visiblePages.push(1);
      if (startPage > 2) {
        visiblePages.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        visiblePages.push('...');
      }
      visiblePages.push(totalPages);
    }

    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          aria-label="First page"
          className={styles.navButton}
        >
          &laquo;&laquo;
        </button>

        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className={styles.navButton}
        >
          &laquo;
        </button>

        <div className={styles.pages}>
          {visiblePages.map((page, index) =>
            page === '...' ? (
              <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`${styles.pageButton} ${
                  currentPage === page ? styles.active : ''
                }`}
                aria-label={`Page ${page}`}
              >
                {page}
              </button>
            ),
          )}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className={styles.navButton}
        >
          &raquo;
        </button>

        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Last page"
          className={styles.navButton}
        >
          &raquo;&raquo;
        </button>
      </div>

      <div className={styles.pageInfo}>
        Страница {currentPage} из {totalPages}
      </div>
    </div>
  );
}
