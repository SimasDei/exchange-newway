import { FastifyInstance } from 'fastify';
import { ExchangeRateType, FiatCurrency, UnifiedExchangeRatesResponse } from '../types/types';
import { getCacheKey } from '../utils/cacheKey';
import { mapFiatRates } from '../utils/mapper';
import BaseExchangeService from './baseExchangeService';

class FiatExchangeService extends BaseExchangeService {
  constructor(
    fastify: FastifyInstance,
    private baseCurrency: FiatCurrency = FiatCurrency.USD
  ) {
    super(fastify);
  }

  protected getCacheKey(): string {
    return getCacheKey(ExchangeRateType.Fiat, this.baseCurrency);
  }

  protected async fetchExchangeRatesFromAPI(): Promise<UnifiedExchangeRatesResponse> {
    const fiatApiUrl = this.fastify.environment.fiatApiUrl;
    const response = await fetch(`${fiatApiUrl}/${this.baseCurrency}`);
    if (!response.ok) {
      throw new Error('Failed to fetch fiat exchange rates');
    }
    const data = await response.json();
    return mapFiatRates(data);
  }
}

export default FiatExchangeService;
