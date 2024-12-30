'use client'

import { SprayCanIcon, CheckIcon, KeyIcon, MessageSquareIcon, MapIcon, TagIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface RatingCategory {
  name: string
  score: number
  icon: React.ReactNode
}

interface RatingDisplayProps {
  overallRating?: number
  totalReviews?: number
  categories?: RatingCategory[]
}

export function RatingDisplay({ 
  overallRating = 4.93,
  totalReviews = 536,
  categories = [
    { name: 'Cleanliness', score: 4.9, icon: <SprayCanIcon className="w-5 h-5" /> },
    { name: 'Accuracy', score: 5.0, icon: <CheckIcon className="w-5 h-5" /> },
    { name: 'Check-in', score: 5.0, icon: <KeyIcon className="w-5 h-5" /> },
    { name: 'Communication', score: 5.0, icon: <MessageSquareIcon className="w-5 h-5" /> },
    { name: 'Location', score: 5.0, icon: <MapIcon className="w-5 h-5" /> },
    { name: 'Value', score: 4.7, icon: <TagIcon className="w-5 h-5" /> },
  ]
}: RatingDisplayProps) {
  return (
    <Card className="w-full p-4">
      <div className="space-y-6">
        {/* Top Section with Rating */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 transform -rotate-45">
              <svg viewBox="0 0 24 24" fill="currentColor" className="text-gray-800">
                <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </div>
            <span className="text-4xl font-bold">{overallRating}</span>
            <div className="w-8 h-8 transform rotate-45">
              <svg viewBox="0 0 24 24" fill="currentColor" className="text-gray-800">
                <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Guest favourite</h3>
            <p className="text-sm text-gray-600 mt-1">
              One of the most loved homes on Mabu Apartments<br />
              based on ratings, reviews and reliability
            </p>
          </div>
        </div>

        {/* Rating Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Overall Rating */}
          <div className="space-y-2">
            <h4 className="font-medium">Overall rating</h4>
            <div className="space-y-1">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="w-3">{rating}</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gray-800 rounded-full ${
                        rating === 5 ? 'w-[95%]' : 
                        rating === 4 ? 'w-[4%]' : 'w-[1%]'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Ratings */}
          {categories.map((category) => (
            <div key={category.name} className="flex flex-col items-center">
              <div className="p-2 rounded-full bg-gray-100 mb-2">
                {category.icon}
              </div>
              <div className="text-center">
                <div className="font-semibold">{category.score}</div>
                <div className="text-sm text-gray-600">{category.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

