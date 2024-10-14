import { Currency, ExchangeRateType } from '../../types/types';
import CryptoExchangeService from '../cryptoExchangeService';
import { RateProvider } from './rateProvider';

export class CryptoRateProvider implements RateProvider {
  constructor(private cryptoExchangeService: CryptoExchangeService) {}

  getType(): ExchangeRateType {
    return ExchangeRateType.Crypto;
  }

  async getRate(currency: Currency): Promise<number> {
    const cryptoRates = await this.cryptoExchangeService.getExchangeRates();
    const rateEntry = cryptoRates.rates[currency];
    if (!rateEntry || rateEntry.type !== ExchangeRateType.Crypto) {
      throw new Error(`Unsupported crypto currency: ${currency}`);
    }
    return rateEntry.value;
  }
}
