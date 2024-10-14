import { CryptoCurrency, FiatCurrency, QuoteQuery } from '../types/types';

export const validateQuoteQuery = (query: any): query is QuoteQuery => {
  const { baseCurrency, quoteCurrency, baseAmount } = query;
  const currencies = [...Object.values(FiatCurrency), ...Object.values(CryptoCurrency)];

  if (!Object.values(currencies).includes(baseCurrency)) {
    console.warn(`Invalid baseCurrency: ${baseCurrency}`);
    return false;
  }

  if (!Object.values(currencies).includes(quoteCurrency)) {
    console.warn(`Invalid quoteCurrency: ${quoteCurrency}`);
    return false;
  }

  const parsedAmount = parseFloat(baseAmount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    console.warn(`Invalid baseAmount: ${baseAmount}`);
    return false;
  }

  return true;
};
