import React from 'react';
import {useCustomCheckout} from '@stripe/react-stripe-js';
import {formatMoneyAmount} from '../util';

type Props = {
  lineItemId: string;
  amount: number;
  currency: string;
  name: string;
  description?: string | null;
  quantity: number;
};

const LineItem = (props: Props) => {
  const {name, currency, description, amount, quantity, lineItemId} = props;

  const [loading, setLoading] = React.useState(false);
  const {updateLineItemQuantity} = useCustomCheckout();

  const handlePlus = () => {
    setLoading(true);
    updateLineItemQuantity({
      lineItem: lineItemId,
      quantity: quantity + 1,
    }).finally(() => {
      setLoading(false);
    });
  };

  const handleMinus = () => {
    if (quantity < 1) {
      return;
    }
    setLoading(true);
    updateLineItemQuantity({
      lineItem: lineItemId,
      quantity: quantity - 1,
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <>
      <div className="flex justify-between items-center py-2 border-b border-gray-200">
        <div className="flex-1 pr-4">
          <div className="text-base text-gray-900">{name}</div>
          <div className="mt-1 text-gray-500">{description}</div>
        </div>
        <div className="text-md font-semibold text-gray-800">
          {quantity ? `${quantity} x` : null}{' '}
          {formatMoneyAmount(currency, amount)}
        </div>
      </div>
      <div className="flex justify-end space-x-2 py-2">
        <button
          disabled={loading}
          onClick={handlePlus}
          className={`btn btn-xs btn-outline ${
            loading ? 'btn-disabled' : 'btn-primary'
          }`}
        >
          {loading ? '+...' : '+'}
        </button>

        <button
          disabled={loading}
          onClick={handleMinus}
          className={`btn btn-xs btn-outline ${loading ? 'btn-disabled' : ''}`}
        >
          {loading ? '-...' : '-'}
        </button>
      </div>
    </>
  );
};
export default LineItem;
