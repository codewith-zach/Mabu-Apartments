import { MapPin, Mail, Phone } from 'lucide-react'

export function ContactInfo() {
  return (
    <div className="bg-[#faf9f6] p-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl hover:bg-[#f5f4f1]">
      <div className="space-y-8">
        <div className="group">
          <div className="flex items-start space-x-4">
            <MapPin className="w-6 h-6 text-[#D4B254] flex-shrink-0 transition-colors duration-300 group-hover:text-[#C4A244]" />
            <div>
              <h3 className="text-xl font-serif mb-2">Address</h3>
              <p className="text-gray-600">
                5, Awande Close, Behind LG Show Room,<br />
                Off Aminu Kano Crescent, Wuse II<br />
                Abuja, Nigeria.
              </p>
            </div>
          </div>
        </div>

        <div className="group">
          <div className="flex items-start space-x-4">
            <Mail className="w-6 h-6 text-[#D4B254] flex-shrink-0 transition-colors duration-300 group-hover:text-[#C4A244]" />
            <div>
              <h3 className="text-xl font-serif mb-2">Email address</h3>
              <p className="text-gray-600">
                <a href="mailto:booking@MabuApartments.com" className="hover:underline">booking@MabuApartments.com</a>
              </p>
              <p className="text-gray-600">
                <a href="mailto:info@Mabuapartments.com" className="hover:underline">info@Mabuapartments.com</a>
              </p>
            </div>
          </div>
        </div>

        <div className="group">
          <div className="flex items-start space-x-4">
            <Phone className="w-6 h-6 text-[#D4B254] flex-shrink-0 transition-colors duration-300 group-hover:text-[#C4A244]" />
            <div>
              <h3 className="text-xl font-serif mb-2">Telephone</h3>
              <p className="text-gray-600">
                <a href="tel:+2349075120963" className="hover:underline">+234 907 512 0963</a>
              </p>
              <p className="text-gray-600">
                <a href="tel:+2348163679671" className="hover:underline">+234 816 367 9671</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

