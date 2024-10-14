import { FastifyInstance } from 'fastify';
import ExchangeService from '../../../src/services/exchangeService';
import { CryptoCurrency, Currency, ExchangeRateResponse, ExchangeRateType, FiatCurrency } from '../../../src/types/types';

describe('ExchangeService - Fiat and Crypto Providers', () => {
  let exchangeService: ExchangeService;
  let mockFastify: jest.Mocked<FastifyInstance>;
  let mockFiatProvider: any;
  let mockCryptoProvider: any;

  beforeEach(() => {
    mockFiatProvider = {
      getRate: jest.fn(),
      getType: jest.fn().mockReturnValue(ExchangeRateType.Fiat),
    };

    mockCryptoProvider = {
      getRate: jest.fn(),
      getType: jest.fn().mockReturnValue(ExchangeRateType.Crypto),
    };

    mockFastify = {
      log: {
        info: jest.fn(),
        warn: jest.fn(),
      },
      providers: new Map<ExchangeRateType, any>([
        [ExchangeRateType.Fiat, mockFiatProvider],
        [ExchangeRateType.Crypto, mockCryptoProvider],
      ]),
    } as any;

    exchangeService = new ExchangeService(mockFastify);
  });

  describe('Fiat-to-Fiat Exchange', () => {
    it('should return correct exchange rate and quote amount for Fiat-to-Fiat', async () => {
      const baseCurrency: Currency = FiatCurrency.USD;
      const quoteCurrency: Currency = FiatCurrency.EUR;
      const baseAmount = 100;

      mockFiatProvider.getRate.mockResolvedValueOnce(1.0); // baseRate
      mockFiatProvider.getRate.mockResolvedValueOnce(0.9); // quoteRate

      const response: ExchangeRateResponse = await exchangeService.getQuote(baseCurrency, quoteCurrency, baseAmount);

      expect(response.exchangeRate).toBe(0.9);
      expect(response.quoteAmount).toBe(90);
      expect(mockFiatProvider.getRate).toHaveBeenCalledTimes(2);
      expect(mockFiatProvider.getRate).toHaveBeenNthCalledWith(1, FiatCurrency.USD);
      expect(mockFiatProvider.getRate).toHaveBeenNthCalledWith(2, FiatCurrency.EUR);
      expect(mockFastify.log.info).toHaveBeenCalledTimes(6);
    });
  });

  describe('Crypto-to-Crypto Exchange', () => {
    it('should return correct exchange rate and quote amount for Crypto-to-Crypto', async () => {
      const baseCurrency: Currency = CryptoCurrency.BTC;
      const quoteCurrency: Currency = CryptoCurrency.ETH;
      const baseAmount = 100;

      mockCryptoProvider.getRate.mockResolvedValueOnce(20000); // baseRate
      mockCryptoProvider.getRate.mockResolvedValueOnce(1500); // quoteRate

      const response: ExchangeRateResponse = await exchangeService.getQuote(baseCurrency, quoteCurrency, baseAmount);

      expect(response.exchangeRate).toBe(0.08);
      expect(response.quoteAmount).toBe(7.5);
      expect(mockCryptoProvider.getRate).toHaveBeenCalledTimes(2);
      expect(mockCryptoProvider.getRate).toHaveBeenNthCalledWith(1, CryptoCurrency.BTC);
      expect(mockCryptoProvider.getRate).toHaveBeenNthCalledWith(2, CryptoCurrency.ETH);
      expect(mockFastify.log.info).toHaveBeenCalledTimes(6);
    });
  });

  describe('Error Handling', () => {
    it('should throw error for unsupported currency type', async () => {
      const baseCurrency = 'UNKNOWN' as Currency;
      const quoteCurrency: Currency = FiatCurrency.EUR;
      const baseAmount = 100;

      const response = exchangeService.getQuote(baseCurrency, quoteCurrency, baseAmount);
      await expect(response).rejects.toThrow('Unsupported currency type: unknown');
      expect(mockFastify.log.warn).toHaveBeenCalledWith('Currency Type for UNKNOWN: unknown');
    });

    it('should throw error when rate provider is missing', async () => {
      mockFastify.providers.delete(ExchangeRateType.Fiat);
      const baseCurrency: Currency = FiatCurrency.USD;
      const quoteCurrency: Currency = FiatCurrency.EUR;
      const baseAmount = 100;

      const response = exchangeService.getQuote(baseCurrency, quoteCurrency, baseAmount);
      await expect(response).rejects.toThrow('No rate provider found for type: fiat');
    });
  });
});
