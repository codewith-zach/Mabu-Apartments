import Image from 'next/image'
import { BookmarkIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/use-scroll-animation'

export function LocationSection() {
  return (
    <div className="mt-32 md:px-10">
      <div className="grid gap-16 items-start">
        <div className="space-y-8">
          <div>
            <p className="text-sm uppercase tracking-wider text-[#978667] mb-3">MABU APARTMENTS</p>
            <h2 className="text-4xl font-bold mt-2">Location</h2>
            <p className="mt-4 text-lg">
              Despite its central location, the surrounding area offers a peaceful retreat, making it ideal for both relaxation and exploration. Whether you're here for business or leisure, our location ensures you're always connected to the best Abuja has to offer.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">Landmarks</h3>

            <div className="space-y-24 px-4">
              <Landmark
                title="Nnamdi Azikiwe International Airport"
                description="Conveniently situated just 40 minutes from Nnamdi Azikiwe International Airport, our property offers quick and hassle-free access for travelers."
                imageUrl="/images/airport1.jpg"
              />
              <Landmark
                title="Shehu Musa Yar'Adua Center"
                description="Our property is conveniently located just 8 minutes from the Shehu Musa Yar'Adua Center, making it an ideal choice for visitors attending events or exploring the center's rich history."
                imageUrl="/images/shehu.jpg"
                reverse
              />
              <Landmark
                title="Abuja National Mosque"
                description="Located just 7 minutes from the iconic Abuja National Mosque, our property offers easy access to one of the city's most significant landmarks."
                imageUrl="/images/mosque.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface LandmarkProps {
  title: string
  description: string
  imageUrl: string
  reverse?: boolean
}

function Landmark({ title, description, imageUrl, reverse = false }: LandmarkProps) {
  const { ref, isInView } = useScrollAnimation()

  return (
    <div 
      className={`flex flex-col ${
        reverse 
          ? 'lg:flex-row' 
          : 'lg:flex-row-reverse'
      } items-center gap-8 lg:gap-12`}
    >
      <div className="flex-1 w-full flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-2">
          <BookmarkIcon className="w-6 h-6 text-primary flex-shrink-0" />
          <h4 className="text-xl font-semibold">{title}</h4>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
      <motion.div
        ref={ref}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: isInView ? 1 : 0.8,
          opacity: isInView ? 1 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="w-full lg:w-1/2"
      >
        <Image
          src={imageUrl}
          alt={title}
          width={500}
          height={300}
          className="rounded-lg object-cover w-full h-[300px]"
        />
      </motion.div>
    </div>
  )
}

