import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            >
                Previous
            </button>
            {[...Array(totalPages).keys()].map((page) => (
                <button
                    key={page + 1}
                    onClick={() => onPageChange(page + 1)}
                    className={`px-4 py-2 mx-1 rounded ${currentPage === page + 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    {page + 1}
                </button>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
