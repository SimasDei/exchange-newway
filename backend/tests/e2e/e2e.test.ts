import { FastifyInstance } from 'fastify';
import { createServer } from '../../src/server/serverFactory';
import { CryptoCurrency, Currency, ExchangeRateResponse, FiatCurrency } from '../../src/types/types';
import { createMockServer } from '../mockServer';

describe('E2E Tests for Currency Exchange API', () => {
  let mainServer: FastifyInstance;
  let mockServer: FastifyInstance;

  beforeAll(async () => {
    mockServer = createMockServer();
    await mockServer.listen({ port: 4000, host: '127.0.0.1' });

    mainServer = createServer();
    await mainServer.ready();
  });

  afterAll(async () => {
    await mainServer.close();
    await mockServer.close();
  });

  describe('GET /quote - Fiat-to-Fiat Exchange', () => {
    it('should return correct exchange rate and quote amount', async () => {
      const baseCurrency: Currency = FiatCurrency.USD;
      const quoteCurrency: Currency = FiatCurrency.EUR;
      const baseAmount = 100;

      const response = await mainServer.inject({
        method: 'GET',
        url: `/quote?baseCurrency=${baseCurrency}&quoteCurrency=${quoteCurrency}&baseAmount=${baseAmount}`,
      });

      expect(response.statusCode).toBe(200);
      const responseBody: ExchangeRateResponse = response.json();
      expect(responseBody).toEqual({
        exchangeRate: 0.9,
        quoteAmount: 90,
      });
    });
  });

  describe('GET /quote - Crypto-to-Crypto Exchange', () => {
    it('should return correct exchange rate and quote amount', async () => {
      const baseCurrency: Currency = CryptoCurrency.BTC;
      const quoteCurrency: Currency = CryptoCurrency.ETH;
      const baseAmount = 100;

      const response = await mainServer.inject({
        method: 'GET',
        url: `/quote?baseCurrency=${baseCurrency}&quoteCurrency=${quoteCurrency}&baseAmount=${baseAmount}`,
      });

      expect(response.statusCode).toBe(200);
      const responseBody: ExchangeRateResponse = response.json();
      expect(responseBody).toEqual({
        exchangeRate: 0.1,
        quoteAmount: 10,
      });
    });
  });

  describe('GET /quote - Error Handling', () => {
    it('should return 400 for unsupported currency type', async () => {
      const baseCurrency = 'UNKNOWN';
      const quoteCurrency: Currency = FiatCurrency.EUR;
      const baseAmount = 100;

      const response = await mainServer.inject({
        method: 'GET',
        url: `/quote?baseCurrency=${baseCurrency}&quoteCurrency=${quoteCurrency}&baseAmount=${baseAmount}`,
      });

      expect(response.statusCode).toBe(400);
      expect(response.json()).toEqual({ error: 'Invalid parameters' });
    });
  });
});
