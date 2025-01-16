'use client'

import { Car, Wifi, Sparkles, ShieldCheck, Zap, Fan, Utensils, ShowerHeadIcon as Shower } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface FacilityProps {
  icon: React.ReactNode
  title: string
  description: string
  index: number
}

function Facility({ icon, title, description, index }: FacilityProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -100px 0px"
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1, // Stagger the animations
        ease: [0.21, 1.11, 0.81, 0.99] // Custom ease curve for smooth animation
      }}
      className="group relative bg-[#faf9f6] hover:bg-[#eceae5] rounded-xl p-4 sm:p-6 transition-all duration-300 shadow-md text-center"
    >
      <div className="flex justify-center items-center mb-4 sm:mb-6">
        <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          {icon}
        </div>
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{title}</h3>
      <p className="text-muted-foreground mx-auto text-sm sm:text-base">{description}</p>
    </motion.div>
  )
}

export function MainFacilities() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, {
    once: true,
    margin: "0px 0px -100px 0px"
  })

  const facilities = [
    { icon: <Car className="w-8 h-8" />, title: "Private Parking", description: "Enjoy hassle-free travel with complimentary on-site parking available for all guests." },
    { icon: <Wifi className="w-8 h-8" />, title: "High Speed Wifi", description: "Stay connected throughout your stay with high-speed internet access available in all rooms and common areas." },
    { icon: <Sparkles className="w-8 h-8" />, title: "House Keeping", description: "Experience a spotless and welcoming environment with our professional housekeeping services." },
    { icon: <ShieldCheck className="w-8 h-8" />, title: "Security", description: "Your safety is our priority. Our property is equipped with 24/7 security measures, including surveillance systems and trained personnel." },
    { icon: <Zap className="w-8 h-8" />, title: "24 hours Power", description: "Enjoy uninterrupted comfort with our reliable 24-hour power supply, ensuring all your needs are met without any disruptions." },
    { icon: <Fan className="w-8 h-8" />, title: "Air Conditioning", description: "Stay cool and comfortable with our fully air-conditioned rooms and spaces, providing the perfect retreat no matter the weather." },
    { icon: <Utensils className="w-8 h-8" />, title: "Kitchen", description: "Our fully equipped kitchen is designed for your convenience, featuring modern appliances and all the essentials you need." },
    { icon: <Shower className="w-8 h-8" />, title: "Private Bathroom", description: "Enjoy the privacy and comfort of your own en-suite bathroom, complete with modern fixtures, fresh towels, and complimentary toiletries." },
  ]

  return (
    <div className="mt-32 bg-[#faf9f6]">
      <div className="container mx-auto px-4 py-16 sm:py-24 md:px-10">
        <motion.div 
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-wider text-[#978667] mb-3">MABU APARTMENTS</p>
          <h2 className="text-4xl font-bold mt-2">Main Facilities</h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {facilities.map((facility, index) => (
            <Facility key={index} {...facility} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

