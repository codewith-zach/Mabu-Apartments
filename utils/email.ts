import nodemailer from "nodemailer"
import { format } from "date-fns"

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
                      Dear Guest,
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

export async function sendBookingConfirmationEmail(to: string, bookingDetails: any) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: to,
    subject: "Booking Confirmation - Mabu Apartments",
    html: generateBookingEmailTemplate(bookingDetails),
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

