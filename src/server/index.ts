import express from 'express';
import {Response} from 'express';
import path from 'path';
import Stripe from 'stripe';

export const app = express();

const stripe = new Stripe('sk_test_51HcCgbBaAnoFOnBJLIWYusaC07VI6LxciZzF6nHNFpD2d63mXulCM96bG6tT9o4VSZSXVwUipf4IwNI7xeD2KqVd00E1Ao23Du', {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  apiVersion: '2023-10-16; custom_checkout_beta=v1',
}); 

let lastCheckoutSession: string | null = null;
const getCachedSession = async () => {
  if (lastCheckoutSession) {
    const session = await stripe.checkout.sessions.retrieve(
      lastCheckoutSession
    );
    if (session.status === 'open') {
      return session;
    } else {
      return null;
    }
  }
  return null;
};

app.post('/checkout', async (_, res: Response) => {
  const cachedSession = await getCachedSession();
  if (cachedSession) {
    res.send({clientSecret: cachedSession.client_secret});
  } else {
    const checkout = await stripe.checkout.sessions.create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...({ui_mode: 'custom'} as any),
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'product name',
              description: 'product description',
              tax_code: 'txcd_10000000',
            },
            tax_behavior: 'exclusive',
            unit_amount: 900,
          },
          quantity: 3,
        },
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'product name',
              description: 'product description',
              tax_code: 'txcd_00000000',
            },
            tax_behavior: 'exclusive',
            unit_amount: 1000,
          },
          quantity: 3,
        },
      ],
      automatic_tax: {enabled: true},
      phone_number_collection: {enabled: true},
      mode: 'payment',
      allow_promotion_codes: true,
      return_url: 'http://localhost:5173/success',
      shipping_address_collection: {allowed_countries: ['CA', 'US']},
    });
    lastCheckoutSession = checkout.id;

    res.send({clientSecret: checkout.client_secret});
  }
});


app.get('/api/test', (_, res) => res.json({greeting: 'test, world!'}));

app.get('/success', (_, res) => {
  res.sendFile(path.join(process.cwd(), '/success.html'));
});

if (!process.env['VITE']) {
  const frontendFiles = process.cwd() + '/dist';
  app.use(express.static(frontendFiles));
  app.get('/*', (_, res) => {
    res.send(frontendFiles + '/index.html');
  });
  app.listen(process.env['PORT']);
}
