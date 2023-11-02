import {useCustomCheckout} from '@stripe/react-stripe-js';

const ShippingSelector = () => {
  const {shipping, shippingOptions, updateShippingOption} = useCustomCheckout();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const shippingOptionId = e.target.value;
    updateShippingOption(shippingOptionId);
  };

  return (
    <div>
      {shippingOptions.map((option) => {
        const isSelected = shipping && shipping.shippingOption.id === option.id;
        return (
          <div key={option.id}>
            <label>
              <input
                onChange={handleChange}
                type="radio"
                name="shipping"
                checked={!!isSelected}
                value={option.id}
              />
              {option.displayName} {option.currency} {option.amount}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default ShippingSelector;
