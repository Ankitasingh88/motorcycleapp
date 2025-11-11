import { Loader2, AlertCircle } from 'lucide-react'

export function LoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-purple-500 to-secondary-500 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-16 h-16 text-white animate-spin mx-auto mb-4" />
        <p className="text-white text-xl font-semibold">
          Loading motorcycle repair shops...
        </p>
        <p className="text-white/80 text-sm mt-2">Please wait a moment</p>
      </div>
    </div>
  )
}

interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-purple-500 to-secondary-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Error Loading Data
        </h2>
        <p className="text-gray-600 mb-6">{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="btn-primary">
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}

export function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
      <div className="text-6xl mb-4">😔</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">No shops found</h2>
      <p className="text-gray-600 mb-6">
        Try adjusting your filters or search terms
      </p>
      <button onClick={onClear} className="btn-primary">
        Clear Filters
      </button>
    </div>
  )
}

export function ShopCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="skeleton h-6 w-3/4 mb-3"></div>
      <div className="skeleton h-5 w-1/2 mb-4"></div>
      <div className="skeleton h-4 w-full mb-2"></div>
      <div className="skeleton h-4 w-5/6 mb-4"></div>
      <div className="skeleton h-10 w-full mt-4"></div>
    </div>
  )
}