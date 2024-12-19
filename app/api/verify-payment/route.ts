import { NextResponse } from 'next/server'
import https from 'https'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const reference = url.searchParams.get('reference')
    console.log('Received reference:', reference)

    if (!reference) {
      return NextResponse.json({ status: 'error', message: 'Missing reference parameter' }, { status: 400 })
    }

    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: `/transaction/verify/${reference}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    }

    return new Promise((resolve, reject) => {
      const reqPaystack = https.request(options, (res) => {
        let data = ''

        res.on('data', (chunk) => {
          data += chunk
        })

        res.on('end', () => {
          try {
            const response = JSON.parse(data)
            console.log('Paystack response:', response)
            if (response.status && response.data.status === 'success') {
              resolve(NextResponse.json({
                status: 'success',
                reference: response.data.reference,
                amount: response.data.amount,
                paidAt: response.data.paid_at,
                metadata: response.data.metadata,
                customer: response.data.customer
              }))
            } else {
              console.error('Paystack error:', response.message)
              resolve(NextResponse.json({ status: 'error', message: response.message }, { status: 400 }))
            }
          } catch (error) {
            console.error('Error parsing Paystack response:', error)
            reject(NextResponse.json({ status: 'error', message: 'Error processing payment verification' }, { status: 500 }))
          }
        })
      }).on('error', (error) => {
        console.error('Request error:', error)
        reject(NextResponse.json({ status: 'error', message: 'An error occurred while verifying the transaction' }, { status: 500 }))
      })

      reqPaystack.end()
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ status: 'error', message: 'An unexpected error occurred' }, { status: 500 })
  }
}

