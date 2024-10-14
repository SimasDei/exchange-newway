import { Currency, ExchangeRateType } from '../../types/types';
import FiatExchangeService from '../fiatExchangeService';
import { RateProvider } from './rateProvider';

export class FiatRateProvider implements RateProvider {
  constructor(private fiatExchangeService: FiatExchangeService) {}

  getType(): ExchangeRateType {
    return ExchangeRateType.Fiat;
  }

  async getRate(currency: Currency): Promise<number> {
    const fiatRates = await this.fiatExchangeService.getExchangeRates();
    const rateEntry = fiatRates.rates[currency];
    if (!rateEntry || rateEntry.type !== ExchangeRateType.Fiat) {
      throw new Error(`Unsupported fiat currency: ${currency}`);
    }
    return rateEntry.value;
  }
}
