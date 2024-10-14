import { Tab, Tabs } from '@mui/material';

interface CurrencyTabsProps {
  currentTab: number;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const CurrencyTabs: React.FC<CurrencyTabsProps> = ({ currentTab, onTabChange }) => {
  return (
    <Tabs value={currentTab} onChange={onTabChange} centered>
      <Tab label="Fiat" />
      <Tab label="Crypto" />
    </Tabs>
  );
};

export default CurrencyTabs;
