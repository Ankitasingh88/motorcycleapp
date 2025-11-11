import { MapPin, Phone, Globe, Clock, Star } from 'lucide-react'

interface Shop {
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
}

interface ShopCardProps {
  shop: Shop
}

export function ShopCard({ shop }: ShopCardProps) {
  const hasRating = shop.rating && shop.rating > 0
  const hasReviews = shop.reviews && shop.reviews > 0
  const hasPhone = shop.phone && shop.phone.trim() !== ''
  const hasWebsite = shop.website && shop.website.trim() !== ''
  const hasHours = shop.hours && shop.hours.trim() !== ''
  const hasLocation = shop.latitude && shop.longitude

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 card-hover border border-gray-100">
      {/* Shop Name */}
      <h3 className="text-xl font-bold text-primary-600 mb-3 line-clamp-2 min-h-[3.5rem]">
        {shop.name}
      </h3>

      {/* Rating */}
      {hasRating && (
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-lg text-gray-900">
              {shop.rating!.toFixed(1)}
            </span>
          </div>
          {hasReviews && (
            <span className="text-sm text-gray-500">
              ({shop.reviews!.toLocaleString()} reviews)
            </span>
          )}
        </div>
      )}

      {/* City Badge */}
      {shop.city && (
        <div className="mb-4">
          <span className="badge-primary">
            {shop.city}
          </span>
        </div>
      )}

      {/* Address */}
      {shop.address && (
        <div className="flex items-start gap-2 text-gray-600 mb-4 min-h-[3rem]">
          <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary-500" />
          <span className="text-sm line-clamp-2">{shop.address}</span>
        </div>
      )}

      {/* Contact Info */}
      <div className="space-y-2 mb-4 pt-4 border-t border-gray-200">
        {hasPhone && (
          <a 
            href={`tel:${shop.phone}`} 
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors text-sm group"
          >
            <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="group-hover:underline">{shop.phone}</span>
          </a>
        )}

        {hasWebsite && (
          <a 
            href={shop.website!} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors text-sm group"
          >
            <Globe className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="group-hover:underline truncate">Visit Website</span>
          </a>
        )}
      </div>

      {/* Hours */}
      {hasHours && (
        <div className="flex items-center gap-2 text-xs text-gray-500 italic mb-4">
          <Clock className="w-4 h-4" />
          <span className="line-clamp-1">{shop.hours}</span>
        </div>
      )}

      {/* Map Button */}
      {hasLocation && (
        <a
          href={`https://www.google.com/maps?q=${shop.latitude},${shop.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full btn-primary text-sm"
        >
          <MapPin className="w-4 h-4" />
          View on Google Maps
        </a>
      )}
    </div>
  )
}
