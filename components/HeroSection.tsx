import Image from 'next/image'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <div className="relative h-[60vh] mb-16">
      <Image 
        src="/images/mabuapartmentsfront.jpg"
        alt="Mabu Apartments Exterior"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm uppercase tracking-wider text-[#EBD7B2] mb-3"
        >
          MABU APARTMENTS
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold"
        >
          ABOUT US
        </motion.h1>
      </div>
    </div>
  )
}

