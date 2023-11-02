import {useCustomCheckout} from '@stripe/react-stripe-js';

const PayButton = () => {
  const {confirm, canConfirm, confirmationRequirements} = useCustomCheckout();
  const requirements =
    confirmationRequirements.length > 0
      ? `(requires ${confirmationRequirements.join(', ')})`
      : '';

  const handleConfirm = () => confirm({return_url: 'http://localhost:4242'});
  return (
    <button disabled={!canConfirm} onClick={handleConfirm}>
      Pay {requirements}
    </button>
  );
};

export default PayButton;
