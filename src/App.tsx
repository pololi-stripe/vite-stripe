import {useEffect, useState} from 'react';
import './App.css';
import {loadStripe} from '@stripe/stripe-js';
import {CustomCheckoutProvider} from '@stripe/react-stripe-js';
import CheckoutPage from './CheckoutPage';

const stripe = loadStripe(
  'pk_test_51HcCgbBaAnoFOnBJNdbA1GMEs0C1yJFyBkBdsCVu2Z7qLNIZfGPFLOcLKmMOAZKc8fq19iNWK8qjrDrauAej5VmQ00yHSnW8iG',
  {
    betas: ['custom_checkout_beta_1'],
  }
);

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
    return <h1>Loading...</h1>;
  }
}

export default App;
