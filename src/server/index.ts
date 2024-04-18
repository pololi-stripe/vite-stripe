import express from 'express';
import {Response} from 'express';
import path from 'path';
import Stripe from 'stripe';

export const app = express();
app.use(express.json());

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


const CUSTOMER_ID = 'cus_PhJjWwUJ01uPaN';

app.post('/create-customer-session', async (_, res) => {
  const customer = await stripe.customers.retrieve(CUSTOMER_ID);

  if (customer.deleted) {
    res.json({customer_session_client_secret: null})
  } else {

    const customerSession = await stripe.customerSessions.create({
      customer: customer.id,
      components: {
        payment_element: {
          enabled: true,
          features: {
            payment_method_save: 'enabled',
            payment_method_update: 'enabled',
            payment_method_set_as_default: 'enabled',
            payment_method_remove: 'disabled',
          },
        },
      },
    });

    res.json({customer_session_client_secret: customerSession.client_secret})
  }
});

app.post('/create-confirm-intent', async (req, res) => {
  try {
    console.log('req.body', req.body)
    const intent = await stripe.paymentIntents.create({
      confirm: true,
      amount: 1099,
      currency: 'usd',
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {enabled: true},
      confirmation_token: req.body.confirmationTokenId,
      customer: CUSTOMER_ID,
      payment_method_options: {
        card: {
          require_cvc_recollection: true,
        }
      },
      return_url: 'http://localhost:5173/success',
    });
    res.json({client_secret: intent.client_secret});
  } catch (error) {
    console.log('error', error);
    res.status(400).json({error});
  }
});

if (!process.env['VITE']) {
  const frontendFiles = process.cwd() + '/dist';
  app.use(express.static(frontendFiles));
  app.get('/*', (_, res) => {
    res.send(frontendFiles + '/index.html');
  });
  app.listen(process.env['PORT']);
}
