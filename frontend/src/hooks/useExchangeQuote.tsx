import { useState } from 'react';
import { Currency } from '../types';

interface ExchangeResult {
  exchangeRate: number;
  quoteAmount: number;
}

type UseExchangeQuoteReturn = {
  data: ExchangeResult | null;
  loading: boolean;
  error: string | null;
  fetchQuote: (baseCurrency: Currency, quoteCurrency: Currency, baseAmount: number) => Promise<void>;
};

const useExchangeQuote = (): UseExchangeQuoteReturn => {
  const [data, setData] = useState<ExchangeResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async (baseCurrency: Currency, quoteCurrency: Currency, baseAmount: number) => {
    setLoading(true);
    setError(null);
    setData(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    try {
      const response = await fetch(
        `${backendUrl}/quote?baseCurrency=${baseCurrency}&quoteCurrency=${quoteCurrency}&baseAmount=${baseAmount}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result: ExchangeResult = await response.json();
      setData(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchQuote };
};

export default useExchangeQuote;
