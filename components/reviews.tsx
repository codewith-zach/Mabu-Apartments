'use client'

import { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import { LeaveReviewForm } from './leave-review-form'
import { Star } from 'lucide-react'

type Review = {
  id: number
  name: string
  rating: number
  comment: string
  date: string
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
  const [visibleReviews, setVisibleReviews] = useState<Review[]>([])
  const [page, setPage] = useState(1)
  const [ref, inView] = useInView()
  const reviewsContainerRef = useRef<HTMLDivElement>(null)
  const [showReviewForm, setShowReviewForm] = useState(false)

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

  const fetchReviews = async () => {
    const newReviews: Review[] = Array.from({ length: 3 }, (_, i) => ({
      id: reviews.length + i + 1,
      name: `Guest ${reviews.length + i + 1}`,
      rating: Math.floor(Math.random() * 2) + 4,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
      date: new Date().toLocaleDateString(),
    }))
    setReviews(prevReviews => [...prevReviews, ...newReviews])
    setPage(prevPage => prevPage + 1)
  }

  useEffect(() => {
    if (reviews.length === 0) {
      fetchReviews()
    }
  }, [])

  useEffect(() => {
    if (inView && reviews.length < 20) {
      fetchReviews()
    }
  }, [inView, reviews.length])

  useEffect(() => {
    setVisibleReviews(reviews.slice(0, page * 3))
  }, [reviews, page])

  const handleLeaveReview = () => {
    setShowReviewForm(true)
  }

  return (
    <div ref={reviewsContainerRef} className="pt-8 mt-20 max-w-3xl px-4 sm:px-6 lg:px-8 bg-[#faf9f6]">
      <h2 className="text-3xl font-semibold mb-6 ml-4">Guest Reviews</h2>
      <div 
        className="space-y-6 max-h-[calc(100vh-250px)] overflow-y-auto pr-4 scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {visibleReviews.map(review => (
          <Card key={review.id} className="shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden ml-4 bg-[#F5F2ED]">
            <CardHeader className="bg-gray-50 bg-[#F5F2ED]">
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
              <CardDescription className="text-sm mt-1 bg-[#F5F2ED]">{review.date}</CardDescription>
            </CardHeader>
            <CardContent className="py-6 ">
              <p className="text-gray-700 text-lg leading-relaxed">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
        {reviews.length < 20 && <div ref={ref} className="h-10" />}
      </div>
      <div className="mt-8 flex justify-center">
        <Button onClick={handleLeaveReview} className="bg-primary text-primary-foreground hover:bg-primary/90">
          Leave a Review
        </Button>
      </div>
      {showReviewForm && <LeaveReviewForm onClose={() => setShowReviewForm(false)} />}
    </div>
  )
}
