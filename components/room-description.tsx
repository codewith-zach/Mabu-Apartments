import { Bed, Lock, Car, Tv, Zap, ShowerHeadIcon as Shower, Utensils, Wifi, Wind, Fan, Shirt } from 'lucide-react'

const amenities = [
  { icon: Bed, label: 'King Size Bed' },
//   { icon: Lock, label: 'Security' },
//   { icon: Car, label: 'Private Parking' },
  { icon: Tv, label: '32 Inch TV' },
//   { icon: Accessibility, label: 'Disable Access' },
//   { icon: PawPrint, label: 'Pet Allowed' },
  { icon: Utensils, label: 'Kitchen' },
  { icon: Wifi, label: 'Wifi access' },
  { icon: Fan, label: 'Air Condition' },
//   { icon: Fan, label: 'Air Condition' },
  { icon: Shirt, label: 'House Keeping' },
  { icon: Zap, label: '24 Hours Power' },
  { icon: Shower, label: 'Private Bathroom' },
]

export function RoomDescription() {
  return (
    <div className="container mx-auto px-4 py-16 bg-[#faf9f6]">
      <div className="grid lg:grid-cols-2 gap-16 p-4">
        <div className="space-y-6 lg:sticky lg:top-20 pt-4">
        <p className="text-sm uppercase tracking-wider text-[#978667] mb-3">
            mabu apartments
          </p>
          <h2 className="text-3xl font-bold mb-8">
            A deeply space that invites you to truly Switch Off.
          </h2>
          <div className="space-y-4 text-neutral-600">
          <p className="text-base mb-8 leading-relaxed text-gray-600">
              The dark wood panelling and furnishings, deluxe red-draped four-poster bed, and magnificent black stone bathroom evoke the charm of a secluded Sierra Nevada getaway. The intimate scale and finish give the room a distinctly personal feel.
            </p>
            <p className="text-base mb-8 leading-relaxed text-gray-600">
              The dark wood panelling and furnishings, deluxe red-draped four-poster bed, and magnificent black stone bathroom evoke the charm.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
  )
}

