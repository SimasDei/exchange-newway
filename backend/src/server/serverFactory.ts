import cors from '@fastify/cors';
import dotenv from 'dotenv';
import Fastify from 'fastify';
import LRUCache from '../cache/lruCache';
import quoteController from '../controllers/quoteController';
import { UnifiedExchangeRatesResponse } from '../types/types';
import { initializeProviders } from '../utils/initializeProviders';
import { initializeServices } from '../utils/initializeServices';
import loggerOptions from '../utils/loggerConfig';

export function createServer() {
  const env = process.env.NODE_ENV || 'development';
  dotenv.config({ path: `.env.${env}` });

  const server = Fastify({
    logger: loggerOptions,
  });

  server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  const cache = new LRUCache<string, UnifiedExchangeRatesResponse>(10);
  const services = initializeServices(server);
  const rateProviders = initializeProviders(services);
  const environment = setupEnvironment();

  server.decorate('environment', environment);
  server.decorate('cache', cache);
  server.decorate('services', services);
  server.decorate('providers', rateProviders);

  server.register(quoteController);

  return server;
}

function setupEnvironment() {
  const { FIAT_API_URL, CRYPTO_API_URL, PORT } = process.env;

  if (!FIAT_API_URL || !CRYPTO_API_URL) {
    throw new Error('Missing API URL configuration');
  }

  return {
    fiatApiUrl: FIAT_API_URL,
    cryptoApiUrl: CRYPTO_API_URL,
    port: PORT ? parseInt(PORT, 10) : 3000,
  };
}
