import {AddressElement, PaymentElement} from '@stripe/react-stripe-js';
import CustomerDetails from './checkout/CustomerDetails';
import OrderSummary from './checkout/OrderSummary';
import PromotionCodes from './checkout/PromotionCodes';
import ShippingSelector from './checkout/ShippingSelector';
import PayButton from './checkout/PayButton';

const CheckoutPage = () => {
  return (
    <div>
      <h3>Customer details</h3>
      <CustomerDetails />
      <h3>Order summary</h3>
      <OrderSummary />
      <h3>Promotion codes</h3>
      <PromotionCodes />
      <h3>Shipping options</h3>
      <ShippingSelector />
      <h3>Shipping address</h3>
      <AddressElement options={{mode: 'shipping'}} />
      <h3>Billing address</h3>
      <AddressElement options={{mode: 'billing'}} />
      <h3>Payment</h3>
      <PaymentElement />
      <PayButton />
    </div>
  );
};

export default CheckoutPage;
