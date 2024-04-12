import {useEffect, useState} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {CustomCheckoutProvider} from '@stripe/react-stripe-js';
import CheckoutPage from './CheckoutPage';

const Loading = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-12 h-12 animate-spin mb-4 text-primary"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
      <h1 className="text-4xl font-bold">Loading...</h1>
    </div>
  );
};

const stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY as string, {
  betas: ['custom_checkout_beta_2'],
});

function App() {
  const [clientSecret, setClientSecret] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({quantity: 1}),
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
    };
    fetchData();
  }, []);

  if (clientSecret) {
    return (
      <CustomCheckoutProvider stripe={stripe} options={{clientSecret}}>
        <CheckoutPage />
      </CustomCheckoutProvider>
    );
  } else {
    return <Loading />;
  }
}

export default App;
