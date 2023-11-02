import LineItem from './LineItem';
import {useCustomCheckout} from '@stripe/react-stripe-js';

const OrderSummary = () => {
  const {currency, lineItems, taxAmounts, discountAmounts, total} =
    useCustomCheckout();
  return (
    <div>
      {lineItems.map((li) => (
        <LineItem
          key={li.id}
          amount={li.amount}
          currency={currency}
          name={li.name}
          description={li.description}
        />
      ))}
      <h4>Tax</h4>
      {taxAmounts && taxAmounts.length > 0
        ? taxAmounts.map((tax, i) => (
            <LineItem
              key={i}
              amount={tax.amount}
              currency={currency}
              name={tax.displayName}
            />
          ))
        : 'No tax'}
      <h4>Discounts</h4>
      {discountAmounts && discountAmounts.length > 0
        ? discountAmounts.map((discount, i) => (
            <LineItem
              key={i}
              amount={discount.amount}
              currency={currency}
              name={discount.displayName}
            />
          ))
        : 'No discounts'}
      <h4>Subtotal</h4>
      {currency} {total.subtotal}
      <h4>Total</h4>
      {currency} {total.total}
    </div>
  );
};

export default OrderSummary;
