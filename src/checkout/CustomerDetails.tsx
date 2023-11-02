import {useCustomCheckout} from '@stripe/react-stripe-js';

const CustomerDetails = () => {
  const {phoneNumber, updatePhoneNumber, email, updateEmail} =
    useCustomCheckout();

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    updatePhoneNumber(e.target.value);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    updateEmail(e.target.value);

  return (
    <div>
      <div>Phone number</div>
      <div>
        <input
          type="text"
          value={phoneNumber || ''}
          onChange={handlePhoneNumberChange}
        />
      </div>
      <div>Email</div>
      <div>
        <input type="text" value={email || ''} onChange={handleEmailChange} />
      </div>
    </div>
  );
};

export default CustomerDetails;
