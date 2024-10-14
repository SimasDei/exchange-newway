import { Typography } from '@mui/material';

interface ExchangeResultProps {
  exchangeRate: number;
  quoteAmount: number;
}

const ExchangeResult: React.FC<ExchangeResultProps> = ({ exchangeRate, quoteAmount }) => {
  return (
    <Typography variant="h6" style={{ marginTop: '2rem' }}>
      Exchange Rate: {exchangeRate}
      <br />
      Quote Amount: {quoteAmount}
    </Typography>
  );
};

export default ExchangeResult;
