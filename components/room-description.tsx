import { Bed, Tv, Zap, ShowerHeadIcon as Shower, Utensils, Wifi, Fan, Shirt } from 'lucide-react'

const amenities = [
  { icon: Bed, label: 'King Size Bed' },
  { icon: Tv, label: '32 Inch TV' },
  { icon: Utensils, label: 'Kitchen' },
  { icon: Wifi, label: 'Wifi access' },
  { icon: Fan, label: 'Air Condition' },
  { icon: Shirt, label: 'House Keeping' },
  { icon: Zap, label: '24 Hours Power' },
  { icon: Shower, label: 'Private Bathroom' },
]

export function RoomDescription() {
  return (
    <div className="w-full bg-[#faf9f6]">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-6 lg:sticky lg:top-20 pt-4">
            <p className="text-sm uppercase tracking-wider text-[#978667] mb-3">
              mabu apartments
            </p>
            <h2 className="text-3xl font-bold mb-8">
            Luxury Meets Comfort in Every Corner.
            </h2>
            <div className="space-y-4 text-neutral-600">
              <p className="text-base mb-8 leading-relaxed text-gray-600">
              Our rooms are thoughtfully designed to blend comfort and elegance, offering a perfect retreat for every guest. Each space features modern amenities, cozy furnishings, and stylish décor to create a relaxing and welcoming atmosphere.              </p>
              <p className="text-base mb-8 leading-relaxed text-gray-600">
              Whether you&apos;re visiting for business or leisure, our rooms provide the ideal balance of luxury and convenience, ensuring a restful and memorable stay.              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-neutral-100">
                  <amenity.icon className="w-6 h-6 text-neutral-600" />
                </div>
                <span className="text-neutral-600">{amenity.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}