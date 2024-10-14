import { Currency, ExchangeRateType } from '../types/types';

export const getCacheKey = (type: ExchangeRateType, baseCurrency: Currency): string => {
  return `${type}_${baseCurrency}`;
};
