import Fastify from 'fastify';
import { CryptoRatesAPIResponse, ExchangeRatesAPIResponse, ExchangeRateType } from '../src/types/types';

export function createMockServer() {
  const mockServer = Fastify();

  mockServer.get('/api/fake-fiat/:baseCurrency', async (request, reply) => {
    const { baseCurrency } = request.params as { baseCurrency: string };
    const response: ExchangeRatesAPIResponse = {
      base: baseCurrency,
      rates: {
        USD: 1,
        EUR: 0.9,
        GBP: 0.8,
        ILS: 3.5,
      },
      date: '2023-10-11',
    };
    return reply.send(response);
  });

  mockServer.get('/api/fake-crypto', async (request, reply) => {
    const response: CryptoRatesAPIResponse = {
      rates: {
        BTC: {
          name: 'Bitcoin',
          unit: 'BTC',
          value: 1,
          type: ExchangeRateType.Crypto,
        },
        ETH: {
          name: 'Ethereum',
          unit: 'ETH',
          value: 0.1,
          type: ExchangeRateType.Crypto,
        },
        XRP: {
          name: 'Ripple',
          unit: 'XRP',
          value: 0.01,
          type: ExchangeRateType.Crypto,
        },
        LTC: {
          name: 'Litecoin',
          unit: 'LTC',
          value: 0.001,
          type: ExchangeRateType.Crypto,
        },
      },
    };
    return reply.send(response);
  });

  return mockServer;
}
