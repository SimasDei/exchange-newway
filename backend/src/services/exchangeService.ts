import { FastifyInstance } from 'fastify';
import { CryptoCurrency, Currency, ExchangeRateResponse, ExchangeRateType, FiatCurrency } from '../types/types';

class ExchangeService {
  constructor(private fastify: FastifyInstance) {}

  async getQuote(baseCurrency: Currency, quoteCurrency: Currency, baseAmount: number): Promise<ExchangeRateResponse> {
    this.fastify.log.info(`getQuote called with baseCurrency: ${baseCurrency}, quoteCurrency: ${quoteCurrency}, baseAmount: ${baseAmount}`);

    const baseType = this.getCurrencyType(baseCurrency);
    const quoteType = this.getCurrencyType(quoteCurrency);

    this.fastify.log.info(`Currency Type for base (${baseCurrency}): ${baseType}`);
    this.fastify.log.info(`Currency Type for quote (${quoteCurrency}): ${quoteType}`);

    const baseRate = await this.fetchRate(baseCurrency, baseType);
    const quoteRate = await this.fetchRate(quoteCurrency, quoteType);

    this.fastify.log.info(`Fetched baseRate for ${baseCurrency}: ${baseRate}`);
    this.fastify.log.info(`Fetched quoteRate for ${quoteCurrency}: ${quoteRate}`);

    const [exchangeRate, quoteAmount] = this.calculateExchange(quoteRate, baseRate, baseAmount);

    this.fastify.log.info(`Exchange Rate: ${exchangeRate}, Quote Amount: ${quoteAmount}`);

    return {
      exchangeRate,
      quoteAmount,
    };
  }

  private getCurrencyType(currency: Currency): ExchangeRateType | 'unknown' {
    if (Object.values(FiatCurrency).includes(currency as FiatCurrency)) {
      return ExchangeRateType.Fiat;
    }

    if (Object.values(CryptoCurrency).includes(currency as CryptoCurrency)) {
      return ExchangeRateType.Crypto;
    }

    this.fastify.log.warn(`Currency Type for ${currency}: unknown`);
    return 'unknown';
  }

  private async fetchRate(currency: Currency, type: ExchangeRateType | 'unknown'): Promise<number> {
    if (type === ExchangeRateType.Fiat || type === ExchangeRateType.Crypto) {
      const provider = this.fastify.providers.get(type);
      if (!provider) {
        throw new Error(`No rate provider found for type: ${type}`);
      }
      return provider.getRate(currency);
    }
    throw new Error(`Unsupported currency type: ${type}`);
  }

  private calculateExchange(quoteRate: number, baseRate: number, baseAmount: number) {
    const exchangeRate = quoteRate / baseRate;

    const quoteAmount = Math.round(baseAmount * exchangeRate * 100) / 100;
    const roundedExchangeRate = Math.round(exchangeRate * 100) / 100;

    return [roundedExchangeRate, quoteAmount];
  }
}

export default ExchangeService;
