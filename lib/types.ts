export interface Transaction {
  _id?: string;
  amount: number;
  date: string; // ISO date string
  description: string;
  category: string;
}

export interface Category {
  _id?: string;
  name: string;
}

export interface Budget {
  _id?: string;
  category: string;
  amount: number;
  month: string; // YYYY-MM
}

export interface MonthlyExpense {
  month: string;
  total: number;
}

export interface CategorySummary {
  name: string;
  total: number;
}