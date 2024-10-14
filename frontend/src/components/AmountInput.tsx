import { TextField } from '@mui/material';

interface AmountInputProps {
  amount: number;
  onChange: (amount: number) => void;
}

const AmountInput: React.FC<AmountInputProps> = ({ amount, onChange }) => {
  return (
    <TextField label="Amount" type="number" value={amount} onChange={(e) => onChange(Number(e.target.value))} fullWidth margin="normal" />
  );
};

export default AmountInput;
