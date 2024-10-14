import { FastifyInstance } from 'fastify';
import BaseExchangeService from '../../../src/services/baseExchangeService';
import { ExchangeRateType, UnifiedExchangeRatesResponse } from '../../../src/types/types';

const testExchangeRates = {
  base: 'USD',
  rates: {
    USD: { name: 'United States Dollar', unit: 'USD', value: 1.0, type: ExchangeRateType.Fiat },
    EUR: { name: 'Euro', unit: 'EUR', value: 0.9, type: ExchangeRateType.Fiat },
  },
};

class MockExchangeService extends BaseExchangeService {
  protected async fetchExchangeRatesFromAPI(): Promise<UnifiedExchangeRatesResponse> {
    return testExchangeRates;
  }

  protected getCacheKey(): string {
    return 'mockCacheKey';
  }
}

describe('BaseExchangeService', () => {
  let fastify: FastifyInstance;
  let service: MockExchangeService;

  beforeEach(() => {
    fastify = {
      cache: new Map(),
      log: {
        info: jest.fn(),
      },
    } as unknown as FastifyInstance;
    service = new MockExchangeService(fastify);
  });

  it('should fetch exchange rates from API and cache them if not in cache', async () => {
    const exchangeRates = await service.getExchangeRates();
    expect(exchangeRates).toEqual(testExchangeRates);
    expect(fastify.cache.get('mockCacheKey')).toEqual(testExchangeRates);
    expect(fastify.log.info).toHaveBeenCalledWith('Exchange rates cached for mockCacheKey');
  });

  it('should return cached exchange rates if available', async () => {
    fastify.cache.set('mockCacheKey', testExchangeRates);
    const exchangeRates = await service.getExchangeRates();
    expect(exchangeRates).toEqual(testExchangeRates);
    expect(fastify.log.info).not.toHaveBeenCalled();
  });
});
