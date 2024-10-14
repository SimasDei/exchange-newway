import { FastifyInstance } from 'fastify';
import CryptoExchangeService from '../services/cryptoExchangeService';
import ExchangeService from '../services/exchangeService';
import FiatExchangeService from '../services/fiatExchangeService';
import { Services } from '../types/types';

export const initializeServices = (server: FastifyInstance): Services => {
  const fiatExchangeService = new FiatExchangeService(server);
  const cryptoExchangeService = new CryptoExchangeService(server);
  const exchangeService = new ExchangeService(server);
  const services: Services = {
    fiatExchangeService,
    cryptoExchangeService,
    exchangeService,
  };
  return services;
};
