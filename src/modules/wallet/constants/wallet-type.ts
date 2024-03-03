export const WalletType = {
  REGULAR: 'REGULAR',
  DEBT: 'DEBT',
  SAVINGS: 'SAVINGS',
} as const;

export type WalletType = keyof typeof WalletType;
