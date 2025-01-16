import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendBookingConfirmationEmail(to: string, bookingDetails: any) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: to,
    subject: 'Booking Confirmation - Mabu Apartments',
    html: `
      <h1>Booking Confirmation</h1>
      <p>Thank you for booking with Mabu Apartments. Here are your booking details:</p>
      <ul>
        <li>Room: ${bookingDetails.roomType}</li>
        <li>Check-in: ${bookingDetails.checkIn}</li>
        <li>Check-out: ${bookingDetails.checkOut}</li>
        <li>Total Price: ₦${bookingDetails.totalPrice}</li>
      </ul>
      <p>We look forward to hosting you!</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendContactFormEmail(formData: any) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.CONTACT_FORM_RECIPIENT,
    subject: 'New Contact Form Submission',
    html: `
      <h1>New Contact Form Submission</h1>
      <p>Name: ${formData.name}</p>
      <p>Email: ${formData.email}</p>
      <p>Subject: ${formData.subject}</p>
      <p>Message: ${formData.message}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

