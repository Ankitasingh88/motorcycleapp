'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'
import { ShopCard } from './components/Shopcard'
import { Filters } from './components/Filters'
import { LoadingState, ErrorState, EmptyState, ShopCardSkeleton } from './components/States'
import { Pagination } from './components/Pagination'


// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Create client with fallback - will handle errors during data fetching
const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key'
)

export interface Shop {
  id: number
  name: string
  city: string | null
  address: string | null
  rating: number | null
  reviews: number | null
  phone: string | null
  website: string | null
  hours: string | null
  latitude: number | null
  longitude: number | null
  created_at?: string
}

export default function Home() {
  // Data state
  const [shops, setShops] = useState<Shop[]>([])
  const [filteredShops, setFilteredShops] = useState<Shop[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filter state
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [minRating, setMinRating] = useState('')

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Fetch data from Supabase
  useEffect(() => {
    async function fetchShops() {
      try {
        setLoading(true)
        setError(null)

        // Check if environment variables are configured
        if (!supabaseUrl || !supabaseKey) {
          throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.')
        }

        const { data, error: fetchError } = await supabase
          .from('motorcycle_repairs')
          .select('*')
          .order('rating', { ascending: false, nullsFirst: false })

        if (fetchError) throw fetchError

        setShops(data || [])
        setFilteredShops(data || [])
      } catch (err: any) {
        console.error('Error fetching shops:', err)
        setError(err.message || 'Failed to load data. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchShops()
  }, [])


  // Then use it to fetch data
/*const { data, error } = await supabase
  .from('motorcycle_repairs')
  .select('*')*/

  // Apply filters
  useEffect(() => {
    let filtered = shops

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (shop) =>
          shop.name?.toLowerCase().includes(searchLower) ||
          shop.address?.toLowerCase().includes(searchLower) ||
          shop.city?.toLowerCase().includes(searchLower)
      )
    }

    // Country filter
    if (selectedCountry) {
      filtered = filtered.filter((shop) => shop.city?.endsWith(selectedCountry))
    }

    // City filter
    if (selectedCity) {
      filtered = filtered.filter((shop) => shop.city === selectedCity)
    }

    // Rating filter
    if (minRating) {
      const minRatingNum = parseFloat(minRating)
      filtered = filtered.filter(
        (shop) => shop.rating && shop.rating >= minRatingNum
      )
    }

    setFilteredShops(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, selectedCountry, selectedCity, minRating, shops])

  // Get unique countries and cities
  const countries = Array.from(
    new Set(
      shops
        .map((shop) => shop.city?.split(', ').pop())
        .filter(Boolean) as string[]
    )
  ).sort()

  const cities = Array.from(
    new Set(shops.map((shop) => shop.city).filter(Boolean) as string[])
  ).sort()

  // Pagination
  const totalPages = Math.ceil(filteredShops.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentShops = filteredShops.slice(startIndex, endIndex)

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchTerm('')
    setSelectedCountry('')
    setSelectedCity('')
    setMinRating('')
    setCurrentPage(1)
  }, [])

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Retry loading
  const retryLoad = () => {
    window.location.reload()
  }

  // Loading state
  if (loading) {
    return <LoadingState />
  }

  // Error state
  if (error) {
    return <ErrorState message={error} onRetry={retryLoad} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-purple-500 to-secondary-500">
      {/* Header */}
      <header className="text-center py-12 px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 drop-shadow-2xl">
          🏍️ European Motorcycle Repair Directory
        </h1>
        <p className="text-xl text-white/90 drop-shadow-lg">
          Find trusted motorcycle repair shops across Europe
        </p>
        <div className="mt-4 flex justify-center gap-4 text-white/80 text-sm">
          <span>✨ {shops.length.toLocaleString()} Shops</span>
          <span>🌍 {countries.length} Countries</span>
          <span>🏙️ {cities.length} Cities</span>
        </div>
      </header>

      {/* Filters */}
      <div className="container-custom mb-8">
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          minRating={minRating}
          setMinRating={setMinRating}
          countries={countries}
          cities={cities}
          filteredCount={filteredShops.length}
          totalCount={shops.length}
          onClearFilters={clearFilters}
        />
      </div>

      {/* Shop Cards */}
      <div className="container-custom pb-8">
        {currentShops.length === 0 ? (
          <EmptyState onClear={clearFilters} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentShops.map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="container-custom pb-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Footer */}
      <footer className="text-center py-8 text-white/80 text-sm">
        <p>© 2024 Motorcycle Directory. All rights reserved.</p>
        <p className="mt-2">Made with ❤️ for motorcycle enthusiasts</p>
      </footer>
    </div>
  )
}





/*import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}*/
