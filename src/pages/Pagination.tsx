type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages: (number | string)[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (currentPage > 4) {
      pages.push('…');
    }
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 3) {
      pages.push('…');
    }
    pages.push(totalPages);
  }

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}>&lt;</button>
      )}
      {pages.map((p, index) =>
        typeof p === 'number' ? (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={p === currentPage ? 'active' : ''}
            disabled={p === currentPage}
          >
            {p}
          </button>
        ) : (
          <span key={`ellipsis-${index}`} className="ellipsis">
            {p}
          </span>
        )
      )}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>&gt;</button>
      )}
    </div>
  );
}

export default Pagination;
