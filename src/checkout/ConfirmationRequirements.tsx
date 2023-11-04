import {useCustomCheckout} from '@stripe/react-stripe-js';

const ConfirmationRequirements = () => {
  const {confirmationRequirements} = useCustomCheckout();

  if (confirmationRequirements.length === 0) {
    return null;
  }

  return (
    <div className="card bg-warning">
      <div className="card-body">
        <h3 className="card-title">⚠️ Missing inputs</h3>
        <ul className="list-disc list-inside">
          {confirmationRequirements.map((requirement) => (
            <li key={requirement}>{requirement}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ConfirmationRequirements;
