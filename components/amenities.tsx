import { Wifi, Tv, Wind, DogIcon as DogBowl, Bed, BuildingIcon as Balcony, ShipWheelIcon as Wheelchair, Wine, Shirt, LockKeyhole } from 'lucide-react'

const amenityIcons: { [key: string]: React.ElementType } = {
  'King Size Bed': Bed,
  'Balcony': Balcony,
  'Disable Access': Wheelchair,
  'Welcome Bottle': Wine,
  'Air Dryer': Wind,
  'Safety Box': LockKeyhole,
  '32 Inch TV': Tv,
  'Pet Allowed': DogBowl,
  'Wifi / Netflix access': Wifi,
  'Air Condition': Wind,
  'Laundry Service': Shirt,
}

export function Amenities({ amenities }: { amenities: string[] }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {amenities.map((amenity) => {
          const Icon = amenityIcons[amenity] || Wifi
          return (
            <div key={amenity} className="flex items-center space-x-2">
              <Icon className="w-5 h-5 text-gray-600" />
              <span>{amenity}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

