import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface SearchBoxProps {
  show: boolean;
  onClose: () => void;
}

const suggestions = [
  { keyword: "our impact", path: "/our-impact" },
  { keyword: "our work", path: "/our-work" },
  { keyword: "about us", path: "/about-us" },
  { keyword: "stories", path: "/stories" },
  { keyword: "donate", path: "/donate" },
];

const SearchBox = ({ show, onClose }: SearchBoxProps) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const queryWords = query.toLowerCase().split(/\s+/).filter(Boolean);
  const filteredSuggestions = suggestions.filter(({ keyword }) =>
    queryWords.some((word) => keyword.toLowerCase().includes(word))
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
    setShowSuggestions(wordCount >= 3);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(onClose, 8000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Searching for "${query}"... results coming never 😎`);
    setQuery("");
    setShowSuggestions(false);
    onClose();
  };

  useEffect(() => {
    if (show) timeoutRef.current = setTimeout(onClose, 8000);
    // return () => timeoutRef.current && clearTimeout(timeoutRef.current);
    return () => void (timeoutRef.current && clearTimeout(timeoutRef.current));
  }, [show]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!show) return null;

  return (
    <div
      ref={searchRef}
      className="absolute top-full right-4 mt-2 w-[24rem] z-50 rounded-xl shadow-xl border border-border backdrop-blur-lg bg-[--card-bg] text-[--text-color] transition-all duration-300"
    >
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Type Keywords to look for ..."
          className="w-full px-4 py-2 bg-transparent text-[--text-color] placeholder:text-[--placeholder-color] border-none outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-orange-500 text-white rounded-r-md hover:bg-orange-600"
        >
          Go
        </button>
      </form>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="mt-2 p-2 space-y-1">
          {filteredSuggestions.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                onClick={() => {
                  setQuery("");
                  onClose();
                }}
                className="block px-3 py-2 rounded-lg hover:bg-[--hover-bg] transition-colors duration-200"
              >
                {item.keyword}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
