'use client'

import { useState, useEffect, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import { LeaveReviewForm } from './leave-review-form'
import { Star } from 'lucide-react'

type Review = {
  id: string
  name: string
  rating: number
  comment: string
  createdAt: string
}

const globalStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`

export function Reviews({ roomId }: { roomId: string }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [ref, inView] = useInView()
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const styleTag = document.createElement('style')
      styleTag.textContent = globalStyles
      document.head.appendChild(styleTag)

      return () => {
        document.head.removeChild(styleTag)
      }
    }
  }, [])

  const fetchReviews = useCallback(async (pageNumber: number) => {
    try {
      setIsFetching(true)
      const response = await fetch(`/api/reviews?roomId=${roomId}&page=${pageNumber}&limit=5`)
      const data = await response.json()

      setReviews((prevReviews) => {
        const newReviews = [...prevReviews, ...data.reviews]
        const uniqueReviews = Array.from(new Set(newReviews.map((r) => r.id)))
          .map((id) => newReviews.find((r) => r.id === id)!)
        return uniqueReviews
      })

      setHasMore(data.hasMore)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setIsFetching(false)
    }
  }, [roomId])

  // Initial fetch
  useEffect(() => {
    fetchReviews(1)
  }, [fetchReviews])

  // Fetch more reviews when in view
  useEffect(() => {
    if (inView && hasMore && !isFetching) {
      fetchReviews(page)
      setPage((prevPage) => prevPage + 1)
    }
  }, [inView, hasMore, isFetching, page, fetchReviews])

  const handleLeaveReview = () => {
    setShowReviewForm(true)
  }

  const handleCloseReviewForm = () => {
    setShowReviewForm(false)
    // Reset states and fetch reviews again
    setReviews([])
    setPage(1)
    setHasMore(true)
    fetchReviews(1)
  }

  return (
    <div className="pt-8 mt-20 max-w-3xl px-4 sm:px-6 lg:px-8 bg-[#faf9f6]">
      <h2 className="text-3xl font-semibold mb-6 ml-4">Guest Reviews</h2>
      <div
        className="space-y-6 max-h-[calc(100vh-250px)] overflow-y-auto pr-4 scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {reviews.map((review) => (
          <Card
            key={review.id}
            className="shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden ml-4 bg-[#F5F2ED]"
          >
            <CardHeader className="bg-[#F5F2ED]">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl bg-[#F5F2ED]">{review.name}</CardTitle>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`w-5 h-5 ${
                        index < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <CardDescription className="text-sm mt-1 bg-[#F5F2ED]">
                {new Date(review.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="py-6">
              <p className="text-gray-700 text-lg leading-relaxed">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
        {hasMore && <div ref={ref} className="h-10" />}
      </div>
      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleLeaveReview}
          className="bg-[#978667] hover:bg-[#4B514C] text-white font-semibold"
        >
          Leave a Review
        </Button>
      </div>
      {showReviewForm && <LeaveReviewForm onClose={handleCloseReviewForm} roomId={roomId} />}
    </div>
  )
}
