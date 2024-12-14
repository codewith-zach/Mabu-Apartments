import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-4xl font-bold mb-8">About Mabu Apartments</h1>

      <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <p className="text-lg mb-4">
            Mabu Apartments is a premier luxury apartment provider in the heart of Abuja, Nigeria. 
            Since our establishment in 2010, we have been committed to offering our guests an unparalleled 
            experience of comfort, style, and convenience.
          </p>
          <p className="text-lg mb-4">
            Our apartments are thoughtfully designed to cater to both short-term and long-term stays, 
            making us the perfect choice for business travelers, tourists, and those seeking a home away from home.
          </p>
        </div>
        <div className="relative h-[300px] md:h-[400px]">
          <Image 
            src="/images/mabuapartmentsfront.jpg" 
            alt="Mabu Apartments Exterior" 
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-4">Our History</h2>
      <p className="text-lg mb-8">
        Founded by a group of hospitality enthusiasts, Mabu Apartments started as a small venture 
        with just a handful of units. Over the years, we have grown to become one of the most sought-after 
        accommodation providers in Abuja, known for our attention to detail and exceptional customer service.
      </p>

      <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
      <p className="text-lg mb-8">
        At Mabu Apartments, our mission is to provide a home-like environment that exceeds our guests' 
        expectations. We strive to create spaces that blend comfort, luxury, and functionality, ensuring 
        that every stay is memorable and satisfying.
      </p>

      <h2 className="text-3xl font-bold mb-4">Our Values</h2>
      <ul className="list-disc list-inside text-lg mb-8">
        <li>Excellence in service delivery</li>
        <li>Attention to detail in every aspect of our operations</li>
        <li>Respect for our guests, employees, and the environment</li>
        <li>Continuous improvement and innovation</li>
        <li>Integrity in all our business dealings</li>
      </ul>

      <h2 className="text-3xl font-bold mb-4">Our Team</h2>
      <p className="text-lg mb-8">
        Behind Mabu Apartments is a dedicated team of professionals committed to making your stay 
        as comfortable as possible. From our friendly front desk staff to our meticulous housekeeping 
        team, everyone at Mabu Apartments works tirelessly to ensure your experience is nothing short of exceptional.
      </p>

      <div className="bg-gray-100 p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="text-lg mb-2">We'd love to hear from you! Whether you have questions about our apartments or want to make a reservation, our team is here to help.</p>
        <p className="text-lg mb-2">Phone: +234 907 512 0963</p>
        <p className="text-lg mb-2">Email: info@mabuapartments.com</p>
        <p className="text-lg">Address: 5, Awande Close, Behind LG Show Room, Off Aminu Kano Crescent, Wuse II Abuja, Nigeria</p>
      </div>
    </div>
  )
}

