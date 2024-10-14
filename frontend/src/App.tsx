import { Alert, Box, CircularProgress, Container, Typography } from '@mui/material';
import { useState } from 'react';
import CurrencyTabs from './components/CurrencyTabs';
import ExchangeForm from './components/ExchangeForm';
import ExchangeResult from './components/ExchangeResult';
import useExchangeQuote from './hooks/useExchangeQuote';
import { CryptoCurrency, Currency, FiatCurrency } from './types';

const fiatCurrencies = Object.values(FiatCurrency);
const cryptoCurrencies = Object.values(CryptoCurrency);

function App() {
  const [tab, setTab] = useState(0);
  const [baseCurrency, setBaseCurrency] = useState<Currency>(FiatCurrency.USD);
  const [quoteCurrency, setQuoteCurrency] = useState<Currency>(FiatCurrency.EUR);
  const [baseAmount, setBaseAmount] = useState(100);

  const { data: result, loading, error, fetchQuote } = useExchangeQuote();

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
    if (newValue === 0) {
      setBaseCurrency(FiatCurrency.USD);
      setQuoteCurrency(FiatCurrency.EUR);
    } else {
      setBaseCurrency(CryptoCurrency.BTC);
      setQuoteCurrency(CryptoCurrency.ETH);
    }
  };

  const handleSubmit = async () => {
    await fetchQuote(baseCurrency, quoteCurrency, baseAmount);
  };

  const currentCurrencies = tab === 0 ? fiatCurrencies : cryptoCurrencies;

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Currency Exchange
      </Typography>
      <CurrencyTabs currentTab={tab} onTabChange={handleTabChange} />
      <ExchangeForm
        baseCurrency={baseCurrency}
        setBaseCurrency={setBaseCurrency}
        quoteCurrency={quoteCurrency}
        setQuoteCurrency={setQuoteCurrency}
        baseAmount={baseAmount}
        setBaseAmount={setBaseAmount}
        onSubmit={handleSubmit}
        currencies={currentCurrencies}
      />
      {loading && (
        <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Alert severity="error" style={{ marginTop: '1rem' }}>
          {error}
        </Alert>
      )}
      {result && !loading && !error && <ExchangeResult exchangeRate={result.exchangeRate} quoteAmount={result.quoteAmount} />}
    </Container>
  );
}

export default App;
