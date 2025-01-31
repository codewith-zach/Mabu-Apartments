import nodemailer from "nodemailer"
import { format } from "date-fns"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number.parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

function generateBookingEmailTemplate(bookingDetails: any) {
  const formattedCheckIn = format(new Date(bookingDetails.checkIn), "EEEE, MMMM do yyyy")
  const formattedCheckOut = format(new Date(bookingDetails.checkOut), "EEEE, MMMM do yyyy")

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmation - Mabu Apartments</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 40px 20px 40px; text-align: center;">
                    <img src="${process.env.NEXT_PUBLIC_APP_URL}/images/logo.png" alt="Mabu Apartments" style="width: 150px; height: auto;">
                    <h1 style="color: #333; margin: 20px 0; font-size: 28px;">Booking Confirmation</h1>
                  </td>
                </tr>
                
                <!-- Welcome Message -->
                <tr>
                  <td style="padding: 0 40px;">
                    <p style="color: #666; font-size: 16px; line-height: 24px;">
                      Dear ${bookingDetails.guestName},
                    </p>
                    <p style="color: #666; font-size: 16px; line-height: 24px;">
                      Thank you for choosing Mabu Apartments. We're delighted to confirm your booking.
                    </p>
                  </td>
                </tr>

                <!-- Booking Details -->
                <tr>
                  <td style="padding: 20px 40px;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8f8f8; border-radius: 4px;">
                      <tr>
                        <td style="padding: 20px;">
                          <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                                <strong style="color: #333;">Room Type:</strong>
                                <span style="color: #666; float: right;">${bookingDetails.roomType}</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                                <strong style="color: #333;">Check-in:</strong>
                                <span style="color: #666; float: right;">${formattedCheckIn}</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                                <strong style="color: #333;">Check-out:</strong>
                                <span style="color: #666; float: right;">${formattedCheckOut}</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 10px 0;">
                                <strong style="color: #333;">Total Price:</strong>
                                <span style="color: #666; float: right;">₦${bookingDetails.totalPrice.toLocaleString()}</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Additional Information -->
                <tr>
                  <td style="padding: 20px 40px;">
                    <h2 style="color: #333; font-size: 20px; margin-bottom: 15px;">Important Information</h2>
                    <ul style="color: #666; font-size: 16px; line-height: 24px; padding-left: 20px;">
                      <li>Check-in time: After 12:00 PM</li>
                      <li>Check-out time: Before 12:00 PM</li>
                      <li>Please have a valid ID ready at check-in</li>
                      <li>Free parking is available on premises</li>
                    </ul>
                  </td>
                </tr>

                <!-- Contact Information -->
                <tr>
                  <td style="padding: 20px 40px;">
                    <h2 style="color: #333; font-size: 20px; margin-bottom: 15px;">Need Help?</h2>
                    <p style="color: #666; font-size: 16px; line-height: 24px;">
                      If you have any questions or need to modify your booking, please contact us:
                    </p>
                    <p style="color: #666; font-size: 16px; line-height: 24px;">
                      📞 +234 907 512 0963<br>
                      📞 +234 816 367 9671<br>
                      ✉️ hello.mabuapartment@gmail.com
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 40px; text-align: center; background-color: #f8f8f8; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                    <p style="color: #666; font-size: 14px; margin: 0;">
                      5, Awande Close, Behind LG Show Room,<br>
                      Off Aminu Kano Crescent, Wuse II<br>
                      Abuja, Nigeria
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}

async function generateManagerEmailTemplate(bookingDetails: any) {
  const rooms = await prisma.room.findMany({
    include: {
      roomType: true,
      bookings: {
        where: {
          checkOut: {
            gte: new Date(),
          },
        },
        orderBy: {
          checkIn: "asc",
        },
      },
      availability: {
        where: {
          AND: [
            {
              date: {
                gte: new Date(),
              },
            },
            {
              isAvailable: true,
            },
          ],
        },
        orderBy: {
          date: "asc",
        },
        take: 1,
      },
    },
  })

  const totalRooms = rooms.length
  const bookedRooms = rooms.filter((room) => room.bookings.length > 0).length
  const occupancyRate = (bookedRooms / totalRooms) * 100

  const formattedCheckIn = format(new Date(bookingDetails.checkIn), "EEEE, MMMM do yyyy")
  const formattedCheckOut = format(new Date(bookingDetails.checkOut), "EEEE, MMMM do yyyy")

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Booking Notification - Management Report</title>
        <style>
          .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .table th, .table td { padding: 10px; border: 1px solid #ddd; }
          .table th { background-color: #f5f5f5; }
          .highlight { background-color: #fff3cd; }
          .section { margin-bottom: 30px; }
        </style>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #978667; border-bottom: 2px solid #978667; padding-bottom: 10px;">New Booking Notification</h1>
        
        <div class="section">
          <h2>New Booking Details</h2>
          <table class="table">
            <tr>
              <th>Guest Name</th>
              <td>${bookingDetails.guestName}</td>
            </tr>
            <tr>
              <th>Guest Email</th>
              <td>${bookingDetails.guestEmail}</td>
            </tr>
            <tr>
              <th>Room Type</th>
              <td>${bookingDetails.roomType}</td>
            </tr>
            <tr>
              <th>Check-in</th>
              <td>${formattedCheckIn}</td>
            </tr>
            <tr>
              <th>Check-out</th>
              <td>${formattedCheckOut}</td>
            </tr>
            <tr>
              <th>Total Price</th>
              <td>₦${bookingDetails.totalPrice.toLocaleString()}</td>
            </tr>
          </table>
        </div>

        <div class="section">
          <h2>Current Occupancy Overview</h2>
          <p>
            <strong>Current Occupancy Rate:</strong> ${occupancyRate.toFixed(1)}%<br>
            <strong>Booked Rooms:</strong> ${bookedRooms} out of ${totalRooms}
          </p>
        </div>

        <div class="section">
          <h2>Upcoming Bookings (Next 30 Days)</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Room</th>
                <th>Guest</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${rooms
                .map((room) =>
                  room.bookings
                    .filter((booking) => new Date(booking.checkIn) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))
                    .map(
                      (booking) => `
                    <tr class="${booking.id === bookingDetails.bookingId ? "highlight" : ""}">
                      <td>${room.roomType.name} (${room.roomNumber})</td>
                      <td>${booking.guestName}</td>
                      <td>${format(new Date(booking.checkIn), "MMM d, yyyy")}</td>
                      <td>${format(new Date(booking.checkOut), "MMM d, yyyy")}</td>
                      <td>₦${booking.totalPrice.toLocaleString()}</td>
                    </tr>
                  `,
                    )
                    .join(""),
                )
                .join("")}
            </tbody>
          </table>
        </div>

        <div class="section">
          <h2>Available Rooms</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Room Type</th>
                <th>Room Number</th>
                <th>Next Available Date</th>
              </tr>
            </thead>
            <tbody>
              ${rooms
                .map(
                  (room) => `
                <tr>
                  <td>${room.roomType.name}</td>
                  <td>${room.roomNumber}</td>
                  <td>${
                    room.bookings.some(
                      (booking) => new Date(booking.checkIn) <= new Date() && new Date(booking.checkOut) > new Date(),
                    )
                      ? format(new Date(room.bookings[0].checkOut), "MMM d, yyyy")
                      : room.availability && room.availability[0]
                        ? format(new Date(room.availability[0].date), "MMM d, yyyy")
                        : format(new Date(), "MMM d, yyyy")
                  }</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </div>

        <div class="section">
          <h2>Monthly Revenue Overview</h2>
          <p>
            <strong>This Month's Revenue:</strong> ₦${(
              rooms.reduce(
                (total, room) =>
                  total +
                  room.bookings
                    .filter((booking) => new Date(booking.checkIn).getMonth() === new Date().getMonth())
                    .reduce((sum, booking) => sum + booking.totalPrice, 0),
                0,
              )
            ).toLocaleString()}
          </p>
        </div>

        <footer style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
          <p>This is an automated management report from Mabu Apartments Booking System</p>
        </footer>
      </body>
    </html>
  `
}

export async function sendBookingConfirmationEmail(to: string, bookingDetails: any) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: to,
    subject: "Booking Confirmation - Mabu Apartments",
    html: generateBookingEmailTemplate(bookingDetails),
  }

  await transporter.sendMail(mailOptions)
}

export async function sendManagerNotificationEmail(bookingDetails: any) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: "hello.mabuapartment@gmail.com",
    subject: `New Booking Alert - ${bookingDetails.roomType}`,
    html: await generateManagerEmailTemplate(bookingDetails),
  }

  await transporter.sendMail(mailOptions)
}

export async function sendContactFormEmail(formData: any) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.CONTACT_FORM_RECIPIENT,
    subject: "New Contact Form Submission",
    html: `
      <h1>New Contact Form Submission</h1>
      <p>Name: ${formData.name}</p>
      <p>Email: ${formData.email}</p>
      <p>Subject: ${formData.subject}</p>
      <p>Message: ${formData.message}</p>
    `,
  }

  await transporter.sendMail(mailOptions)
}

