import styles from './Pagination.module.css';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
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

    if (startPage > 1) visiblePages.push(1);
    if (startPage > 2) visiblePages.push('...');

    for (let i = startPage; i <= endPage; i++) visiblePages.push(i);

    if (endPage < totalPages - 1) visiblePages.push('...');
    if (endPage < totalPages) visiblePages.push(totalPages);

    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={styles.container}>
      <div className={styles.pagination}>
        <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
          &laquo;&laquo;
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &laquo;
        </button>

        {visiblePages.map((page, i) =>
          page === '...' ? (
            <span key={`ellipsis-${i}`}>...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={currentPage === page ? styles.active : ''}
            >
              {page}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &raquo;
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          &raquo;&raquo;
        </button>
      </div>
    </div>
  );
};
