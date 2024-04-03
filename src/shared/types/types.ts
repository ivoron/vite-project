export interface ITransaction {
  title: string;
  sum: number;
  date: number;
}

export type TransactionType = "income" | "expense"