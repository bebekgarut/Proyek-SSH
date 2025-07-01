const Pagination = ({ meta, onPageChange, hasData }) => {
    const { current_page, last_page } = meta;
    const prev = current_page > 1;
    const next = current_page < last_page;

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;

        let startPage = Math.max(
            1,
            current_page - Math.floor(maxPagesToShow / 2),
        );
        let endPage = Math.min(last_page, startPage + maxPagesToShow - 1);

        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(1, endPage - (maxPagesToShow - 1));
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`min-h-10 h-10 join-item btn ${
                        i === current_page ? "btn-active" : ""
                    }`}
                >
                    {i}
                </button>,
            );
        }
        return pageNumbers;
    };

    if (!hasData) {
        return null;
    }

    return (
        <div className="join p-2">
            {prev && (
                <button
                    onClick={() => onPageChange(current_page - 1)}
                    className="min-h-10 h-10 join-item btn"
                >
                    «
                </button>
            )}

            {renderPageNumbers()}

            {next && (
                <button
                    onClick={() => onPageChange(current_page + 1)}
                    className="min-h-10 h-10 join-item btn"
                >
                    »
                </button>
            )}
        </div>
    );
};

export default Pagination;
