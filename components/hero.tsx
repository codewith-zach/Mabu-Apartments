import Image from 'next/image'

export default function Hero() {
  return (
    <div className="relative h-[60vh] min-h-[400px] w-full">
      <Image
        src="/images/rooms/room1.jpg"
        alt="Luxury hotel room"
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
      <p className="text-sm uppercase tracking-wider text-[#EBD7B2] mb-3">
                Mabu apartments
              </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4">
              Rooms & Suites
            </h1>
      </div>
    </div>
  )
}

