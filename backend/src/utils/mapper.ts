import {
  CryptoCurrency,
  CryptoRatesAPIResponse,
  Currency,
  ExchangeRate,
  ExchangeRatesAPIResponse,
  ExchangeRateType,
  UnifiedExchangeRatesResponse,
} from '../types/types';

export const mapFiatRates = (apiResponse: ExchangeRatesAPIResponse): UnifiedExchangeRatesResponse => {
  const rates: Record<string, ExchangeRate> = {};

  for (const [currency, rate] of Object.entries(apiResponse.rates)) {
    const upperCurrency = currency.toUpperCase() as Currency;
    rates[upperCurrency] = {
      name: upperCurrency,
      unit: upperCurrency,
      value: rate,
      type: ExchangeRateType.Fiat,
    };
  }

  const upperBase = apiResponse.base.toUpperCase() as Currency;
  rates[upperBase] = {
    name: upperBase,
    unit: upperBase,
    value: 1,
    type: ExchangeRateType.Fiat,
  };

  return {
    base: upperBase,
    rates,
  };
};

export const mapCryptoRates = (apiResponse: CryptoRatesAPIResponse): UnifiedExchangeRatesResponse => {
  const rates: Record<string, ExchangeRate> = {};

  for (const [currency, details] of Object.entries(apiResponse.rates)) {
    const upperCurrency = currency.toUpperCase() as Currency;
    rates[upperCurrency] = {
      name: details.name,
      unit: details.unit.toUpperCase(),
      value: details.value,
      type: ExchangeRateType.Crypto,
    };
  }

  const baseCurrency = CryptoCurrency.BTC;
  rates[baseCurrency] = {
    name: 'Bitcoin',
    unit: baseCurrency,
    value: 1,
    type: ExchangeRateType.Crypto,
  };

  return {
    base: baseCurrency,
    rates,
  };
};
