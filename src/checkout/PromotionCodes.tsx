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
    <div className="space-y-2">
      <input
        type="text"
        value={draft}
        onChange={handleChange}
        className="input input-bordered w-full max-w-xs"
        placeholder="Enter code"
      />

      <div className="flex justify-end space-x-2">
        <button
          disabled={loading}
          onClick={handleSubmit}
          className={`btn btn-xs btn-outline ${
            loading ? 'btn-disabled' : 'btn-primary'
          }`}
        >
          {loading ? 'Applying...' : 'Apply'}
        </button>

        <button onClick={handleRemove} className="btn btn-xs btn-outline">
          Remove
        </button>
      </div>
    </div>
  );
};

export default PromotionCodes;
