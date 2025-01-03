'use client'

import Image from 'next/image'

interface HeroProps {
  title: string;
}

export default function Hero({ title = "Rooms & Suites" }: HeroProps) {
  return (
    <div className="relative h-[60vh] min-h-[400px] w-full">
      <Image
        src="/images/rooms/room1.jpg"
        alt="Luxury hotel room"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
        <p 
          className="text-sm uppercase tracking-wider text-[#EBD7B2] mb-3 animate-[fadeIn_0.6s_ease-out_0.2s_forwards] opacity-0"
          style={{
            animation: 'fadeIn 0.6s ease-out 0.2s forwards',
            opacity: 0
          }}
        >
          Mabu apartments
        </p>
        <h1 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 animate-[fadeIn_0.6s_ease-out_0.4s_forwards] opacity-0"
          style={{
            animation: 'fadeIn 0.6s ease-out 0.4s forwards',
            opacity: 0
          }}
        >
          {title}
        </h1>
      </div>

      {/* Keyframes style */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

