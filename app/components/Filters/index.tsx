import { Search, MapPin, Building2, Star, X } from 'lucide-react'

interface FiltersProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  selectedCountry: string
  setSelectedCountry: (value: string) => void
  selectedCity: string
  setSelectedCity: (value: string) => void
  minRating: string
  setMinRating: (value: string) => void
  countries: string[]
  cities: string[]
  filteredCount: number
  totalCount: number
  onClearFilters: () => void
}

export function Filters({
  searchTerm,
  setSearchTerm,
  selectedCountry,
  setSelectedCountry,
  selectedCity,
  setSelectedCity,
  minRating,
  setMinRating,
  countries,
  cities,
  filteredCount,
  totalCount,
  onClearFilters,
}: FiltersProps) {
  const hasActiveFilters = searchTerm || selectedCountry || selectedCity || minRating

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Search */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Search className="w-4 h-4" />
            Search
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Name, address, city..."
            className="input-field"
          />
        </div>

        {/* Country */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <MapPin className="w-4 h-4" />
            Country
          </label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="select-field"
          >
            <option value="">All Countries ({countries.length})</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Building2 className="w-4 h-4" />
            City
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="select-field"
          >
            <option value="">All Cities ({cities.length})</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Star className="w-4 h-4" />
            Minimum Rating
          </label>
          <select
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            className="select-field"
          >
            <option value="">Any Rating</option>
            <option value="4.8">4.8+ Stars ⭐⭐⭐⭐⭐</option>
            <option value="4.5">4.5+ Stars ⭐⭐⭐⭐</option>
            <option value="4.0">4.0+ Stars ⭐⭐⭐</option>
            <option value="3.5">3.5+ Stars ⭐⭐</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Showing{' '}
          <span className="font-bold text-primary-600 text-lg">
            {filteredCount.toLocaleString()}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-gray-900">
            {totalCount.toLocaleString()}
          </span>{' '}
          repair shops
          {hasActiveFilters && (
            <span className="ml-2 text-primary-600">(filtered)</span>
          )}
        </p>
      </div>
    </div>
  )
}
