import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import {SPMCheckoutForm} from './SPMCheckoutForm';
import {useEffect, useState} from 'react';

const stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY as string, {
  betas: ['elements_saved_payment_methods_beta_1'],
});

export default function SPMApp() {
  const [customerSessionClientSecret, setCustomerSessionClientSecret] =
    useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/create-customer-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setCustomerSessionClientSecret(data.customer_session_client_secret);
    };
    fetchData();
  }, []);

  const options = {
    mode: 'payment' as const,
    amount: 1099,
    currency: 'usd',
    customerSessionClientSecret: customerSessionClientSecret,
    paymentMethodOptions: {
      card: {
        require_cvc_recollection: true,
      },
    },
    appearance: {
      theme: 'stripe',
    },
  };

  if (!customerSessionClientSecret) {
    return null;
  }

  return (
    <Elements stripe={stripe} options={options}>
      <SPMCheckoutForm />
    </Elements>
  );
}
