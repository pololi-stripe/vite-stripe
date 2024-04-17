import express from 'express';
import {Response} from 'express';
import path from 'path';
import Stripe from 'stripe';

export const app = express();

const lineItems = [
  {
    price_data: {
      currency: 'usd',
      product_data: {
        name: 'Product A',
        description: 'This is a taxable product',
        tax_code: 'txcd_10000000',
      },
      tax_behavior: 'exclusive',
      unit_amount: 900,
    },
    quantity: 3,
    adjustable_quantity: {
      enabled: true,
      minimum: 1,
      maximum: 10,
    },
  },
  {
    price_data: {
      currency: 'usd',
      product_data: {
        name: 'Product B',
        description: 'This is a non-taxable product',
        tax_code: 'txcd_00000000',
      },
      tax_behavior: 'exclusive',
      unit_amount: 1000,
    },
    quantity: 2,
    adjustable_quantity: {
      enabled: true,
      minimum: 1,
      maximum: 10,
    },
  },
];

const shippingOptions = [
  {
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: {
        amount: 0,
        currency: 'usd',
      },
      display_name: 'Free shipping',
      tax_behavior: 'exclusive',
      tax_code: 'txcd_92010001',
      delivery_estimate: {
        minimum: {
          unit: 'business_day',
          value: 5,
        },
        maximum: {
          unit: 'business_day',
          value: 7,
        },
      },
    },
  },
  {
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: {
        amount: 1500,
        currency: 'usd',
      },
      display_name: 'Next day air',
      tax_behavior: 'exclusive',
      tax_code: 'txcd_92010001',
      delivery_estimate: {
        minimum: {
          unit: 'business_day',
          value: 1,
        },
        maximum: {
          unit: 'business_day',
          value: 1,
        },
      },
    },
  },
];

const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY, {
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
    res.send({clientSecret: cachedSession?.client_secret});
  } else {
    const checkout = await stripe.checkout.sessions.create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...({ui_mode: 'custom'} as any),
      currency: "usd",
      mode: "setup",
      // line_items: lineItems,
      // automatic_tax: {enabled: true},
      // phone_number_collection: {enabled: true},
      // mode: 'payment',
      // allow_promotion_codes: true,
      // return_url: 'http://localhost:5173/success',
      // shipping_address_collection: {allowed_countries: ['CA', 'US']},
      // billing_address_collection: 'required',
      // shipping_options: shippingOptions,
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
