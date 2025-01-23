import { NextResponse } from 'next/server';
import https from 'https';

export async function POST(req: Request): Promise<Response> {
  try {
    const { email, amount, metadata } = await req.json();

    if (!email || !amount || !metadata) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const params = JSON.stringify({
      email: email,
      amount: amount,
      metadata: metadata,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-success`,
      channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
    });

    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/transaction/initialize',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    };

    return new Promise((resolve, reject) => {
      const reqPaystack = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          const response = JSON.parse(data);
          if (response.status) {
            resolve(NextResponse.json(response.data));
          } else {
            console.error('Paystack error:', response.message);
            resolve(
              NextResponse.json({ message: response.message }, { status: 400 })
            );
          }
        });
      });

      reqPaystack.on('error', (error) => {
        console.error('Request error:', error);
        resolve(
          NextResponse.json({ message: 'An error occurred' }, { status: 500 })
        );
      });

      reqPaystack.write(params);
      reqPaystack.end();
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
