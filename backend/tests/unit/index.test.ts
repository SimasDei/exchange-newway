import LRUCache from '../../src/cache/lruCache';
import { createServer } from '../../src/server/serverFactory';
import ExchangeService from '../../src/services/exchangeService';

describe('initializeServices', () => {
  let server: ReturnType<typeof createServer>;

  beforeEach(async () => {
    server = createServer();
    await server.ready();
  });

  afterAll(async () => {
    await server.close();
  });

  it('should initialize services correctly', async () => {
    expect(server.services).toBeDefined();
    expect(server.services).toHaveProperty('fiatExchangeService');
    expect(server.services).toHaveProperty('cryptoExchangeService');
    expect(server.services).toHaveProperty('exchangeService');
    expect(server.services.exchangeService).toBeInstanceOf(ExchangeService);
    expect(server.services.fiatExchangeService).toHaveProperty('fetchExchangeRatesFromAPI');
  });

  it('should decorate server with cache', () => {
    expect(server.cache).toBeDefined();
    expect(server.cache).toBeInstanceOf(LRUCache);
  });

  it('should register quote controller', () => {
    const routes = server.printRoutes();
    expect(routes).toContain('quote');
  });
});
