import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = []
  const showPages = 5
  
  let startPage = Math.max(1, currentPage - Math.floor(showPages / 2))
  let endPage = Math.min(totalPages, startPage + showPages - 1)
  
  if (endPage - startPage + 1 < showPages) {
    startPage = Math.max(1, endPage - showPages + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return (
    <div className="flex justify-center items-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg bg-white text-primary-600 border-2 border-primary-500
                   hover:bg-primary-500 hover:text-white
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-primary-600
                   transition-all duration-200"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* First Page */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-4 py-2 rounded-lg bg-white text-gray-700 border-2 border-gray-300
                       hover:border-primary-500 hover:text-primary-600
                       transition-all duration-200"
          >
            1
          </button>
          {startPage > 2 && (
            <span className="px-2 text-gray-400">...</span>
          )}
        </>
      )}

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200
            ${
              page === currentPage
                ? 'bg-primary-500 text-white border-2 border-primary-500 shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-primary-500 hover:text-primary-600'
            }`}
        >
          {page}
        </button>
      ))}

      {/* Last Page */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-2 text-gray-400">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-4 py-2 rounded-lg bg-white text-gray-700 border-2 border-gray-300
                       hover:border-primary-500 hover:text-primary-600
                       transition-all duration-200"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg bg-white text-primary-600 border-2 border-primary-500
                   hover:bg-primary-500 hover:text-white
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-primary-600
                   transition-all duration-200"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Page Info */}
      <div className="ml-4 px-4 py-2 bg-white rounded-lg border-2 border-gray-200">
        <span className="text-sm font-medium text-gray-700">
          Page <span className="font-bold text-primary-600">{currentPage}</span> of{' '}
          <span className="font-semibold">{totalPages}</span>
        </span>
      </div>
    </div>
  )
}
