import { FastifyInstance } from 'fastify';
import { CryptoCurrency, ExchangeRateType, UnifiedExchangeRatesResponse } from '../types/types';
import { getCacheKey } from '../utils/cacheKey';
import { mapCryptoRates } from '../utils/mapper';
import BaseExchangeService from './baseExchangeService';

class CryptoExchangeService extends BaseExchangeService {
  constructor(fastify: FastifyInstance) {
    super(fastify);
  }

  protected getCacheKey(): string {
    return getCacheKey(ExchangeRateType.Crypto, CryptoCurrency.BTC);
  }

  protected async fetchExchangeRatesFromAPI(): Promise<UnifiedExchangeRatesResponse> {
    const response = await fetch(this.fastify.environment.cryptoApiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch crypto exchange rates');
    }
    const data = await response.json();
    return mapCryptoRates(data);
  }
}

export default CryptoExchangeService;
