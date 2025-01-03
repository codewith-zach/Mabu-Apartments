import Image from 'next/image'
import { motion } from 'framer-motion'

export function ContactHero() {
  return (
    <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/mabuapartmentsfront.jpg"
          alt="Luxury hotel background"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm uppercase tracking-wider text-[#EBD7B2] mb-3"  
        >
          Mabu apartments
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4"
        >
          CONTACT US
        </motion.h1>
      </div>
    </div>
  )
}

