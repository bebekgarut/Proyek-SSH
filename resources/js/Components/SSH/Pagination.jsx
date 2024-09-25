const Pagination = ({ meta, onPageChange }) => {
    const prev = meta.links[0].url;
    const next = meta.links[meta.links.length - 1].url;
    const current = meta.current_page;

    return (
        <div className="join">
            {prev && (
                <button
                    onClick={() => onPageChange(current - 1)}
                    className="join-item btn"
                >
                    «
                </button>
            )}

            <button className="join-item btn">Page {current}</button>

            {next && (
                <button
                    onClick={() => onPageChange(current + 1)}
                    className="join-item btn"
                >
                    »
                </button>
            )}
        </div>
    );
};

export default Pagination;
