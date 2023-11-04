import {useCustomCheckout} from '@stripe/react-stripe-js';

const CustomerDetails = () => {
  const {phoneNumber, updatePhoneNumber, email, updateEmail} =
    useCustomCheckout();

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    updatePhoneNumber(e.target.value);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    updateEmail(e.target.value);

  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">Phone Number</span>
      </label>
      <input
        type="tel"
        placeholder="123-456-7890"
        className="input input-bordered w-full max-w-xs"
        value={phoneNumber || ''}
        onChange={handlePhoneNumberChange}
      />
      <label className="label">
        <span className="label-text">Email</span>
      </label>
      <input
        type="email"
        placeholder="test@example.com"
        className="input input-bordered w-full max-w-xs"
        value={email || ''}
        onChange={handleEmailChange}
      />
    </div>
  );
};

export default CustomerDetails;
