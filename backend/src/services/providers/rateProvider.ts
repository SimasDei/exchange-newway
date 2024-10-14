import { Currency, ExchangeRateType } from '../../types/types';

export interface RateProvider {
  getRate(currency: Currency): Promise<number>;
  getType(): ExchangeRateType;
}
