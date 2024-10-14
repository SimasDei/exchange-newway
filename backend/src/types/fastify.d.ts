import 'fastify';
import { Services } from './index';

declare module 'fastify' {
  interface FastifyInstance {
    services: Services;
    cache: LRUCache<string, UnifiedExchangeRatesResponse>;
    providers: Map<ExchangeRateType, RateProvider>;
    environment: {
      fiatApiUrl: string;
      cryptoApiUrl: string;
      port: number;
    };
  }
}
