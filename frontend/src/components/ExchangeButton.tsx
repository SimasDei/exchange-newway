import { Button } from '@mui/material';

interface ExchangeButtonProps {
  onClick: () => void;
}

const ExchangeButton: React.FC<ExchangeButtonProps> = ({ onClick }) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick} fullWidth>
      Get Quote
    </Button>
  );
};

export default ExchangeButton;
