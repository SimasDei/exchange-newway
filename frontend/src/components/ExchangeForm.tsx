import { Box } from '@mui/material';
import { Currency } from '../types';
import AmountInput from './AmountInput';
import CurrencySelector from './CurrencySelector';
import ExchangeButton from './ExchangeButton';

interface ExchangeFormProps {
  baseCurrency: Currency;
  setBaseCurrency: (currency: Currency) => void;
  quoteCurrency: Currency;
  setQuoteCurrency: (currency: Currency) => void;
  baseAmount: number;
  setBaseAmount: (amount: number) => void;
  onSubmit: () => void;
  currencies: Currency[];
}

const ExchangeForm: React.FC<ExchangeFormProps> = ({
  baseCurrency,
  setBaseCurrency,
  quoteCurrency,
  setQuoteCurrency,
  baseAmount,
  setBaseAmount,
  onSubmit,
  currencies,
}) => {
  return (
    <Box mt={2}>
      <CurrencySelector label="Base Currency" selectedCurrency={baseCurrency} onChange={setBaseCurrency} currencies={currencies} />
      <CurrencySelector label="Quote Currency" selectedCurrency={quoteCurrency} onChange={setQuoteCurrency} currencies={currencies} />
      <AmountInput amount={baseAmount} onChange={setBaseAmount} />
      <ExchangeButton onClick={onSubmit} />
    </Box>
  );
};

export default ExchangeForm;
