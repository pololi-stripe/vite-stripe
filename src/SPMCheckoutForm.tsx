import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import {useState} from 'react';

export const SPMCheckoutForm = () => {
  const peOptions = {
    savePaymentMethod: {
      // `maxVisiblePaymentMethods` sets the number of previously saved payment methods that will
      // be rendered in the UI. If you don't specify a value, the default is 3.
      maxVisiblePaymentMethods: 3,

      messages: {
        // Optionally override the descriptor text.
        saveLabel: 'Save payment details for future purchases',

        // Optionally override the descriptor text.
        setAsDefaultLabel: 'Set as default payment method',

        // Optionally override the warning shown prior to removing a payment method.
        removeSavedDialogBody: `This payment method will be removed permanently. Are you sure you want to continue?`,
      },
    },
    // layout: {
    //   type: 'accordion',
    //   defaultCollapsed: false,
    //   radios: true,
    //   spacedAccordionItems: false,
    // },
  };
  // const onPeChange = (event) => console.log('PaymentElement change', event);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const stripe = useStripe();
  const elements = useElements();

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  };

  const handleServerResponse = async (response) => {
    if (response.error) {
      // Show error from server on payment form
      handleError(response.error);
    } else if (response.status === 'requires_action') {
      // Use Stripe.js to handle the required next action
      const {error, paymentIntent} = await stripe.handleNextAction({
        clientSecret: response.clientSecret,
      });

      if (error) {
        // Show error from Stripe.js in payment form
        handleError(error);
      } else {
        // Actions handled, show success message
        setLoading(false);
        window.location.href = `${window.location.origin}/success`;
      }
    } else {
      // No actions needed, show success message
      setLoading(false);
      window.location.href = `${window.location.origin}/success`;
    }
  };

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);

    // Trigger form validation and wallet collection
    const {error: submitError} = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    // Create the ConfirmationToken using the details collected by the Payment Element
    // and additional shipping information
    const {error, confirmationToken} = await stripe.createConfirmationToken({
      elements,
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // creating the ConfirmationToken. Show the error to your customer (for example, payment details incomplete)
      handleError(error);
      return;
    }

    // Create the PaymentIntent
    console.log('confirmationToken', confirmationToken);
    const res = await fetch('/create-confirm-intent', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        confirmationTokenId: confirmationToken.id,
      }),
    });

    const data = await res.json();

    // Handle any next actions or errors. See the Handle any next actions step for implementation.
    handleServerResponse(data);
  };

  return (
    <div className="px-4 md:px-8 py-6">
      <h1 className="text-4xl font-bold mb-8 text-center">SPM Demo</h1>

      <div className="md:grid gap-6">
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">Shipping address</h3>
            <AddressElement options={{mode: 'shipping'}} />
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">Payment</h3>
            <PaymentElement options={peOptions} />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className={`btn btn-wide btn-primary ${
              loading ? 'btn-disabled' : ''
            }`}
          >
            {loading ? 'Processing...' : 'Pay'}
          </button>
        </div>
      </div>
    </div>
  );
};
