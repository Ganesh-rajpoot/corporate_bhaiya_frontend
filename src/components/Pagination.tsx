interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => (
  <div className="flex justify-center items-center gap-3 mt-8">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-4 py-2 rounded-md bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 disabled:opacity-50"
    >
      Prev
    </button>
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        onClick={() => onPageChange(i + 1)}
        className={`px-3 py-2 rounded-full ${
          i + 1 === currentPage
            ? "bg-orange-500 text-white"
            : "bg-gray-100 dark:bg-zinc-700 text-gray-800 dark:text-white"
        } hover:scale-105 transition`}
      >
        {i + 1}
      </button>
    ))}
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-4 py-2 rounded-md bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 disabled:opacity-50"
    >
      Next
    </button>
  </div>
);
