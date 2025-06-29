interface PaginationProps {
  onChangePage: (newPage: number) => void;
  currentPage: number;
  totalPages: number;
}

export default function Pagnination({
  onChangePage,
  currentPage,
  totalPages,
}: PaginationProps) {
  return (
    <div className='flex gap-2 text-white justify-center'>
      {currentPage > 1 && (
        <button
          className='p-2 bg-amber-800 rounded rounded-md'
          onClick={() => onChangePage(currentPage - 1)}
        >
          Previous
        </button>
      )}
      {totalPages > currentPage && (
        <button
          className='p-2 bg-amber-800 rounded rounded-md'
          onClick={() => onChangePage(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
}
