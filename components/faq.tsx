'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "Are pets allowed?",
    answer: "We currently do not allow pets in our apartments to ensure the comfort of all our guests."
  },
  {
    question: "Is room service available here?",
    answer: "No, we do not offer room service at this property."
  },
  {
    question: "Is there a restaurant?",
    answer: "While our property does not have an on-site restaurant, there are several excellent dining options located nearby, offering a variety of cuisines to suit every taste. Additionally, there is a local bakery in the area where guests can order fresh pastries and juices for a delightful start to their day. We’re happy to provide recommendations to help you find the perfect spot for your meals!"
  },
  {
    question: "What's the Wi-Fi policy?",
    answer: "We provide complimentary high-speed Wi-Fi access to all our guests throughout their stay. Login details are provided upon check-in."
  },
  {
    question: "What are the check-in and check-out times at Mabu Apartments?",
    answer: "Check-in at Mabu Apartments is possible from 12:00, check-out is until 12:00."
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="py-24 bg-[#faf9f6]">
      <div className="container mx-auto px-4 md:px-10">
        <div className="grid lg:grid-cols-[1fr,2fr] gap-12 xl:gap-24">
          <div className="lg:max-w-sm">
            <p className="text-primary uppercase tracking-wider">MABU APARTMENTS FAQ</p>
            <h2 className="text-4xl font-bold mt-2 mb-6">Frequently Asked Questions</h2>
            <p className="text-lg mb-12">Can't find your question in the list? We're here to help.</p>
        
            <a href="/contact" className="text-primary hover:text-primary/80 inline-flex items-center">
              Contact Us →
            </a>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-4"
              >
                <button
                  className="flex justify-between items-center w-full text-left py-4"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="text-xl font-medium">{faq.question}</span>
                  <Plus 
                    className={`w-6 h-6 transition-transform ${
                      openIndex === index ? 'rotate-45' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

