export const CurrencyType = {
  USD: 'USD',
  EUR: 'EUR',
  UAH: 'UAH',
} as const;

export type CurrencyType = keyof typeof CurrencyType;
