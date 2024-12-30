'use client'

import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

// Add this CSS utility after the imports
const scrollbarHideStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;     /* Firefox */
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;            /* Chrome, Safari and Opera */
  }
`

type Review = {
  id: number
  name: string
  rating: number
  comment: string
  date: string
}

export function Reviews({ roomId }: { roomId: string }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [page, setPage] = useState(1)
  const [ref, inView] = useInView()

  const fetchReviews = async () => {
    // This would typically be an API call
    const newReviews: Review[] = Array.from({ length: 5 }, (_, i) => ({
      id: reviews.length + i + 1,
      name: `Guest ${reviews.length + i + 1}`,
      rating: Math.floor(Math.random() * 2) + 4,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
      date: new Date().toLocaleDateString(),
    }))
    setReviews(prevReviews => [...prevReviews, ...newReviews])
    setPage(prevPage => prevPage + 1)
  }

  useEffect(() => {
    if (inView) {
      fetchReviews()
    }
  }, [inView])

  return (
    <div className="mt-8 ">
      <h2 className="text-2xl font-semibold mb-4">Guest Reviews</h2>
      <div className="space-y-4 max-h-96 overflow-y-auto pr-4 shadow-inner scrollbar-hide">
        {reviews.map(review => (
          <Card key={review.id} className="shadow-md transition-shadow hover:shadow-lg mb-4 last:mb-0">
            <CardHeader className='bg-[#faf9f6]'>
              <CardTitle>{review.name}</CardTitle>
              <CardDescription>Rating: {review.rating}/5 - {review.date}</CardDescription>
            </CardHeader>
            <CardContent className='bg-[#faf9f6]'>
              <p>{review.comment}</p>
            </CardContent>
          </Card>
        ))}
        <div ref={ref} />
      </div>
    </div>
  )
}

// Add this style tag after the Reviews component declaration
const styleTag = document.createElement('style')
styleTag.textContent = scrollbarHideStyles
document.head.appendChild(styleTag)

