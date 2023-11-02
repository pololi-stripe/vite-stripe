type Props = {
  amount: number;
  currency: string;
  name: string;
  description?: string | null;
};

const LineItem = (props: Props) => {
  const {amount, currency, name, description} = props;
  return (
    <div style={{display: 'flex', flexDirection: 'row', gap: '20px'}}>
      <div style={{width: '100px'}}>
        {currency} {amount}
      </div>
      <div style={{maxWidth: '400px'}}>
        <div>{name}</div>
        <div style={{fontSize: '12px', color: '#999999'}}>{description}</div>
      </div>
    </div>
  );
};
export default LineItem;
