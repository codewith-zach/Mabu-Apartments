"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Phone } from "lucide-react"
import { Dancing_Script } from "next/font/google"

const dancingScript = Dancing_Script({ subsets: ["latin"] })

const SLIDE_DURATION = 5000 // 5 seconds per slide

export default function BakeryPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [activeTab, setActiveTab] = useState("starters")
  const tabBackgrounds = {
    starters: "/images/starters-background.jpg",
    juice: "/images/juice-background.jpg",
  }

  const slides = [
    {
      image: "/images/mabuapartmentsfront.jpg",
      heading: "A TRULY TASTE EXPERIENCE",
      alignment: "text-left pl-20",
    },
    {
      image: "/images/mabuapartmentsfront.jpg",
      heading: "ARTISAN BAKERY",
      alignment: "text-center",
    },
    {
      image: "/images/mabuapartmentsfront.jpg",
      heading: "FRESH DAILY",
      alignment: "text-right pr-20",
    },
  ]

  // Auto-rotate slides
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, SLIDE_DURATION)

    return () => clearInterval(timer)
  }, [isPaused, slides.length])

  const handleDotClick = (index: number) => {
    setCurrentSlide(index)
    setIsPaused(true)
    // Resume auto-rotation after a shorter delay
    setTimeout(() => setIsPaused(false), 1000)
  }

  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = animationStyles
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <>
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100 " : "opacity-0 "
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={`Bakery slide ${index + 1}`}
              fill
              className="object-cover transform transition-transform duration-[2000ms] ease-in-out"
              priority={index === 0}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 flex flex-col min-h-screen text-white px-4">
          <div
            className={`flex flex-col flex-1 justify-center transition-all duration-500
            ${slides[currentSlide].alignment.includes("text-left") ? "sm:text-left text-center" : ""}
            ${slides[currentSlide].alignment.includes("text-right") ? "sm:text-right text-center" : ""}
            ${slides[currentSlide].alignment.includes("text-center") ? "text-center" : ""}
            ${slides[currentSlide].alignment.includes("pl-20") ? "sm:pl-20" : ""}
            ${slides[currentSlide].alignment.includes("pr-20") ? "sm:pr-20" : ""}
          `}
          >
            <p className="text-sm uppercase tracking-wider text-[#EBD7B2] mb-3 opacity-0 animate-fade-in-up">
              rayuwa bakery
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-wider whitespace-pre-line opacity-0 animate-fade-in-up animation-delay-300">
              {slides[currentSlide].heading}
            </h1>
          </div>
        </div>

        {/* Navigation dots */}
        <div
          className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20"
          role="navigation"
          aria-label="Slideshow navigation"
        >
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-125
                ${
                  currentSlide === index
                    ? "bg-white ring-2 ring-white ring-offset-2 ring-offset-black/50"
                    : "bg-white/50 hover:bg-white"
                }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentSlide === index ? "true" : "false"}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 md:px-6 lg:px-8 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-[#978667] uppercase tracking-wider text-sm mb-4">RAYUWA BAKERY</h2>
                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Your daily dose of delicious.</h3>
              </div>

              <div className="space-y-6 text-gray-600">
                <p className="text-lg">
                  Discover a delectable assortment of baked goods that will melt in your mouth. From fresh bread to
                  warm, buttery pastries, every bite is a celebration of flavor and craftsmanship.
                </p>
                <p className="text-lg">
                  Pair your treats with our refreshing selection of freshly pressed juices, perfect for a healthy and
                  energizing start to your day.
                </p>
              </div>

              <p className={`${dancingScript.className} text-2xl text-[#978667] italic`}>Life is sweeter with Rayuwa</p>
            </div>

            <div className="bg-[#faf9f6] rounded-lg space-y-3 shadow-lg p-4 mt-[100px] transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl hover:bg-[#f5f4f1]">
              <div className="flex items-center space-x-6">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center">
                    <span className="text-lg font-medium text-gray-900">Bread</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-medium text-gray-900">Pastries</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-medium text-gray-900">Fresh Juice</span>
                  </div>
                </div>
                <div className="flex flex-col justify-center space-y-2">
                  <span className="text-gray-600">Opens 7.30am</span>
                  <span className="text-gray-600">Until 7.30pm</span>
                </div>
              </div>

              <hr className="border-t border-gray-200 my-4" />

              <div className="pt-1">
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">TO ORDER</p>
                <a
                  href="tel:+123456789"
                  className="text-xl font-medium text-[#978667] hover:text-[#4B514C] transition-colors flex items-center gap-1"
                >
                  <Phone className="h-5 w-5" />
                  +123456789
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-24 px-4 md:px-6 lg:px-8 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-wider text-[#978667] mb-3">rayuwa bakery</p>
            <h2 className="text-4xl font-bold mt-2 text-gray-900">Bakery Menu</h2>

            <div className="flex justify-center gap-8 mt-8 border-b">
              <button
                onClick={() => setActiveTab("starters")}
                className={`px-4 py-2 text-sm uppercase tracking-wider ${
                  activeTab === "starters"
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                STARTERS
              </button>
              <button
                onClick={() => setActiveTab("juice")}
                className={`px-4 py-2 text-sm uppercase tracking-wider ${
                  activeTab === "juice"
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                JUICE BAR
              </button>
            </div>
          </div>

          <div className="relative rounded-lg p-12 mb-16 overflow-hidden">
            <Image
              src={tabBackgrounds[activeTab as keyof typeof tabBackgrounds] || "/placeholder.svg"}
              alt={`${activeTab} menu background`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10">
              <p className="text-sm uppercase tracking-wider text-white/80">
                {activeTab === "starters" ? "FRESH, WARM, AND DELICIOUS" : "FRESH, PURE, AND REFRESHING"}
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
                {activeTab === "starters"
                  ? "Start your day with our freshly baked goods"
                  : "Quench your thirst with our freshly pressed juices"}
              </h3>
              <div className="absolute top-8 right-8">
                <p className="text-[#E5B17D] text-2xl font-light">
                  {/* {activeTab === 'starters' ? 'Fresh Baked' : 'Freshly Squeezed'} */}
                </p>
              </div>
            </div>
          </div>

          {activeTab === "starters" ? (
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
              {[
                {
                  name: "Croissant",
                  description: "Buttery, Flaky Pastry",
                  price: "N1500",
                  image: "/images/croissant.jpg",
                },
                {
                  name: "Pain au Chocolat",
                  description: "Chocolate-filled Pastry",
                  price: "N1800",
                  image: "/images/pain-au-chocolat.jpg",
                },
                {
                  name: "Baguette",
                  description: "Traditional French Bread",
                  price: "N1200",
                  image: "/images/baguette.jpg",
                },
                {
                  name: "Cinnamon Roll",
                  description: "Sweet, Spiced Pastry",
                  price: "N1600",
                  image: "/images/cinnamon-roll.jpg",
                },
                {
                  name: "Sourdough Bread",
                  description: "Artisanal Fermented Bread",
                  price: "N2000",
                  image: "/images/sourdough-bread.jpg",
                },
                {
                  name: "Cheese Danish",
                  description: "Sweet Cheese Pastry",
                  price: "N1700",
                  image: "/images/cheese-danish.jpg",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-lg font-medium text-gray-900">{item.name}</p>
                      <div className="border-b border-dotted border-gray-300 flex-1" />
                      <p className="text-gray-900">{item.price}</p>
                    </div>
                    <p className="text-gray-600 text-sm italic">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
              {[
                {
                  name: "Water Pine Blast 500ml",
                  description: "Watermelon, Pineapple",
                  price: "N2000",
                  image: "/images/water-pine-blast.jpg",
                },
                {
                  name: "Sunshine L'emu 500ml",
                  description: "Sun, Milk",
                  price: "N2000",
                  image: "/images/sunshine-lemu.jpg",
                },
                {
                  name: "Pineapple Gin 500ml",
                  description: "Pineapple, Gin",
                  price: "N2000",
                  image: "/images/pineapple-gin.jpg",
                },
                {
                  name: "Strawberry Pine 500ml",
                  description: "Strawberry, Pineapple",
                  price: "N2500",
                  image: "/images/strawberry-pine.jpg",
                },
                {
                  name: "Orange Ginger 500ml",
                  description: "Orange, Ginger",
                  price: "N2000",
                  image: "/images/orange-ginger.jpg",
                },
                {
                  name: "Classic Veggie 500ml",
                  description: "Veggies",
                  price: "N2500",
                  image: "/images/classic-veggie.jpg",
                },
                {
                  name: "Mango pine 500ml",
                  description: "Mango, Pineapples",
                  price: "N2500",
                  image: "/images/mango-pine.jpg",
                },
                {
                  name: "Fruta mista 500ml",
                  description: "Fruit, Misters",
                  price: "N2500",
                  image: "/images/fruta-mista.jpg",
                },
                {
                  name: "Melon Boost 500ml",
                  description: "Watermelon, Boost",
                  price: "N2000",
                  image: "/images/melon-boost.jpg",
                },
                {
                  name: "Carrot Glow 500ml",
                  description: "Carrots, Glow",
                  price: "N2500",
                  image: "/images/carrot-glow.jpg",
                },
                {
                  name: "Green Glow 500ml",
                  description: "Green, Glow",
                  price: "N2500",
                  image: "/images/green-glow.jpg",
                },
                {
                  name: "Tiger Nut 500ml",
                  description: "Tigernut, Milk",
                  price: "N2000",
                  image: "/images/tiger-nut.jpg",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-lg font-medium text-gray-900">{item.name}</p>
                      <div className="border-b border-dotted border-gray-300 flex-1" />
                      <p className="text-gray-900">{item.price}</p>
                    </div>
                    <p className="text-gray-600 text-sm italic">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

const animationStyles = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

.animation-delay-300 {
  animation-delay: 300ms;
}
`

