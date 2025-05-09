import type { FC } from "react";

interface SearchBarProps {
    searchTerm: string;
    onSearch: (term: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
    return (
        <div className="flex justify-between items-center">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm w-full max-w-sm"
            />
        </div>
    );
};

export default SearchBar;
