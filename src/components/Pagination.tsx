import type { FC } from "react";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
    totalPages,
    currentPage,
    onPageChange,
}) => {
    return (
        <div className="flex justify-end mt-4 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;
                return (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-1 rounded text-sm border ${currentPage === page
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-100"
                            }`}
                    >
                        {page}
                    </button>
                );
            })}
        </div>
    );
};

export default Pagination;
