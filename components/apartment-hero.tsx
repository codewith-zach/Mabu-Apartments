import Image from 'next/image'
interface HeroProps {
    title: string;
  }
  
  export function Hero({ title = "SIERRA DOUBLE ROOM" }: HeroProps) {
    return (
      <div className="relative h-[600px] w-full bg-gray-700 flex items-center justify-center text-center px-4">
        <Image
        src="/images/mabuapartmentsfront.jpg"
        alt="Room background"
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />
        {/* Background number watermark */}
        
        {/* Content */}
        <div className="relative z-10 space-y-6">
        <p className="text-sm uppercase tracking-wider text-[#EBD7B2] mb-3">
                Mabu apartments
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4">
            {title.toUpperCase()}
          </h1>
        </div>
      </div>
    )
  }
  