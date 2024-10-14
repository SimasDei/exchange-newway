import { FastifyInstance } from 'fastify';
import { UnifiedExchangeRatesResponse } from '../types/types';

abstract class BaseExchangeService {
  constructor(protected fastify: FastifyInstance) {}

  protected abstract fetchExchangeRatesFromAPI(): Promise<UnifiedExchangeRatesResponse>;

  protected abstract getCacheKey(): string;

  async getExchangeRates(): Promise<UnifiedExchangeRatesResponse> {
    const cache = this.fastify.cache;
    const cacheKey = this.getCacheKey();
    let exchangeRates = cache.get(cacheKey);
    if (!exchangeRates) {
      exchangeRates = await this.fetchExchangeRatesFromAPI();
      cache.set(cacheKey, exchangeRates);
      this.fastify.log.info(`Exchange rates cached for ${cacheKey}`);
    }
    return exchangeRates;
  }
}

export default BaseExchangeService;
