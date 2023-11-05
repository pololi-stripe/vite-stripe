import React from 'react';

import {useCustomCheckout} from '@stripe/react-stripe-js';

const PayButton = () => {
  const [loading, setLoading] = React.useState(false);
  const {confirm, canConfirm} = useCustomCheckout();

  const handleConfirm = () => {
    setLoading(true);
    confirm().then(() => {
      setLoading(false);
      window.location.href = `${window.location.origin}/success`;
    });
  };

  return (
    <button
      disabled={!canConfirm || loading}
      onClick={handleConfirm}
      className={`btn btn-wide btn-primary ${loading ? 'btn-disabled' : ''}`}
    >
      {loading ? 'Processing...' : 'Pay'}
    </button>
  );
};

export default PayButton;
