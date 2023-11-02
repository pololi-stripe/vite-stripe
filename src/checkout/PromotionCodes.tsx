import React from 'react';

import {useCustomCheckout} from '@stripe/react-stripe-js';

const PromotionCodes = () => {
  const {applyPromotionCode, removePromotionCode} = useCustomCheckout();
  const [draft, setDraft] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft(e.target.value);
  };
  const handleSubmit = () => {
    setLoading(true);
    applyPromotionCode(draft).finally(() => {
      setDraft('');
      setLoading(false);
    });
  };
  const handleRemove = () => {
    removePromotionCode();
  };

  return (
    <div>
      <input type="text" value={draft} onChange={handleChange} />
      <button disabled={loading} onClick={handleSubmit}>
        Apply
      </button>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
};

export default PromotionCodes;
