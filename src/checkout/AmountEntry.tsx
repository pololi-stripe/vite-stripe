import {formatMoneyAmount} from '../util';

type Props = {
  amount: number;
  currency: string;
  name: string;
  description?: string | null;
  quantity?: number;
};

const AmountEntry = (props: Props) => {
  const {name, currency, description, amount, quantity} = props;
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-200">
      <div className="flex-1 pr-4">
        <div className="text-base text-gray-900">{name}</div>
        <div className="mt-1 text-gray-500">{description}</div>
      </div>
      <div className="text-md font-semibold text-gray-800">
        {quantity ? `${quantity} x` : null}{' '}
        {formatMoneyAmount(currency, amount)}
      </div>
    </div>
  );
};
export default AmountEntry;
