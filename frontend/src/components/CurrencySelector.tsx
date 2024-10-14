import { MenuItem, TextField } from '@mui/material';
import { Currency } from '../types';

interface CurrencySelectorProps {
  label: string;
  selectedCurrency: Currency;
  onChange: (currency: Currency) => void;
  currencies: Currency[];
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ label, selectedCurrency, onChange, currencies }) => {
  return (
    <TextField
      select
      label={label}
      value={selectedCurrency}
      onChange={(e) => onChange(e.target.value as Currency)}
      fullWidth
      margin="normal"
    >
      {currencies.map((currency) => (
        <MenuItem key={currency} value={currency}>
          {currency}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CurrencySelector;
