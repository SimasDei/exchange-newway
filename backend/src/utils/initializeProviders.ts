import { CryptoRateProvider } from '../services/providers/cryptoRateProvider';
import { FiatRateProvider } from '../services/providers/fiatRateProvider';
import { RateProvider } from '../services/providers/rateProvider';
import { ExchangeRateType, Services } from '../types/types';

export const initializeProviders = ({ fiatExchangeService, cryptoExchangeService }: Services): Map<ExchangeRateType, RateProvider> => {
  const rateProviders = new Map<ExchangeRateType, RateProvider>([
    [ExchangeRateType.Fiat, new FiatRateProvider(fiatExchangeService)],
    [ExchangeRateType.Crypto, new CryptoRateProvider(cryptoExchangeService)],
  ]);

  return rateProviders;
};
