import {useCustomCheckout} from '@stripe/react-stripe-js';
import {formatMoneyAmount} from '../util';

const ShippingSelector = () => {
  const {shipping, shippingOptions, updateShippingOption} = useCustomCheckout();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const shippingOptionId = e.target.value;
    updateShippingOption(shippingOptionId);
  };

  return (
    <div className="space-y-2">
      {shippingOptions.map((option) => {
        const isSelected = shipping && shipping.shippingOption.id === option.id;
        return (
          <div key={option.id} className="form-control">
            <label className="flex items-center space-x-2">
              <input
                onChange={handleChange}
                type="radio"
                name="shipping"
                checked={!!isSelected}
                value={option.id}
                className="radio radio-primary"
              />
              <span>
                {option.displayName}{' '}
                {formatMoneyAmount(option.currency, option.amount)}
              </span>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default ShippingSelector;
