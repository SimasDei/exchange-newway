import CryptoExchangeService from '../services/cryptoExchangeService';
import ExchangeService from '../services/exchangeService';
import FiatExchangeService from '../services/fiatExchangeService';

export enum ExchangeRateType {
  Fiat = 'fiat',
  Crypto = 'crypto',
}

export interface ExchangeRate {
  name: string;
  unit: string;
  value: number;
  type: ExchangeRateType;
}

export interface QuoteQuery {
  baseCurrency: Currency;
  quoteCurrency: Currency;
  baseAmount: number;
}

export interface ExchangeRateResponse {
  exchangeRate: number;
  quoteAmount: number;
}

export interface UnifiedExchangeRatesResponse {
  base: string;
  rates: Record<string, ExchangeRate>;
}

export interface ExchangeRatesAPIResponse {
  rates: { [key: string]: number };
  base: string;
  date: string;
}

export interface CryptoRatesAPIResponse {
  rates: { [key: string]: { name: string; unit: string; value: number; type: string } };
}

export enum FiatCurrency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  ILS = 'ILS',
}

export enum CryptoCurrency {
  BTC = 'BTC',
  ETH = 'ETH',
  XRP = 'XRP',
  LTC = 'LTC',
}

export type Currency = FiatCurrency | CryptoCurrency;

export type Services = {
  cryptoExchangeService: CryptoExchangeService;
  fiatExchangeService: FiatExchangeService;
  exchangeService: ExchangeService;
};
