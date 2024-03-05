export const CategoryType = {
  EXPENSES: 'EXPENSES',
  INCOME: 'INCOME',
} as const;

export type CategoryType = keyof typeof CategoryType;
