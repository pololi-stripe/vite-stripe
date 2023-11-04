import {useCustomCheckout} from '@stripe/react-stripe-js';

const PayButton = () => {
  const {confirm, canConfirm} = useCustomCheckout();

  const handleConfirm = () =>
    confirm().then(
      () => (window.location.href = `${window.location.origin}/success`)
    );
  return (
    <button
      disabled={!canConfirm}
      onClick={handleConfirm}
      className="btn btn-wide btn-primary"
    >
      Pay
    </button>
  );
};

export default PayButton;
