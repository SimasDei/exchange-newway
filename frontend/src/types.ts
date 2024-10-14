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
