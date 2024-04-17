import {AddressElement, PaymentElement} from '@stripe/react-stripe-js';
import CustomerDetails from './checkout/CustomerDetails';
import OrderSummary from './checkout/OrderSummary';
import PromotionCodes from './checkout/PromotionCodes';
import ShippingSelector from './checkout/ShippingSelector';
import PayButton from './checkout/PayButton';
import ConfirmationRequirements from './checkout/ConfirmationRequirements';

const CheckoutPage = () => {
  return (
    <div className="px-4 md:px-8 py-6">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Elements w/ Custom Checkout Demo
      </h1>

      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1 space-y-6 mb-6">
          <div className="card bg-base-200">
            <div className="card-body square">
              <h3 className="card-title">Order summary</h3>
              <OrderSummary />
            </div>
          </div>

          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title">Promotion codes</h3>
              <PromotionCodes />
            </div>
          </div>

          <ConfirmationRequirements />
        </div>

        <div className="md:col-span-2 md:pl-6 space-y-6">
          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title">Customer details</h3>
              <CustomerDetails />
            </div>
          </div>

          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title">Shipping options</h3>
              <ShippingSelector />
            </div>
          </div>

          {/* <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title">Shipping address</h3>
              <AddressElement options={{mode: 'shipping'}} />
            </div>
          </div> */}

          {/* <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title">Billing address</h3>
              <AddressElement options={{mode: 'billing'}} />
            </div>
          </div> */}

          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title">Payment</h3>
              <PaymentElement />
            </div>
          </div>

          <div className="flex justify-center">
            <PayButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
