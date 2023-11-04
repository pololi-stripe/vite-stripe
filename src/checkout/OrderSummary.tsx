import AmountEntry from './AmountEntry';
import LineItem from './LineItem';
import {useCustomCheckout} from '@stripe/react-stripe-js';
import {formatMoneyAmount} from '../util';

const OrderSummary = () => {
  const {currency, lineItems, total} = useCustomCheckout();
  return (
    <div>
      {lineItems.map((li) => (
        <LineItem
          key={li.id}
          lineItemId={li.id}
          amount={li.unitAmount}
          currency={currency}
          name={li.name}
          description={li.description}
          quantity={li.quantity}
        />
      ))}
      <h4 className="text-lg font-semibold mt-6 mb-2">Subtotal</h4>
      <div className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 py-2">
        {formatMoneyAmount(currency, total.subtotal)}
      </div>
      <AmountEntry
        amount={total.taxExclusive}
        currency={currency}
        name="Exclusive Tax"
      />
      <AmountEntry
        amount={total.taxInclusive}
        currency={currency}
        name="Inclusive Tax"
      />
      <AmountEntry
        amount={total.shippingRate}
        currency={currency}
        name="Shipping"
      />
      <AmountEntry
        amount={total.discount > 0 ? total.discount * -1 : 0}
        currency={currency}
        name="Discount"
      />

      <h4 className="text-lg font-semibold mt-6 mb-2">Total</h4>
      <div className="text-2xl font-bold text-gray-900">
        {formatMoneyAmount(currency, total.total)}
      </div>
    </div>
  );
};

export default OrderSummary;
