'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction, CategorySummary } from '@/lib/types';
import { format } from 'date-fns';

export function SummaryCards() {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [categoryBreakdown, setCategoryBreakdown] = useState<CategorySummary[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/transactions');
      if (res.ok) {
        const transactions: Transaction[] = await res.json();
        // Total Expenses
        const total = transactions.reduce((sum, t) => sum + t.amount, 0);
        setTotalExpenses(total);
        // Category Breakdown
        const categoryData: { [key: string]: number } = {};
        transactions.forEach((t) => {
          categoryData[t.category] = (categoryData[t.category] || 0) + t.amount;
        });
        const formattedData = Object.entries(categoryData).map(([name, total]) => ({
          name,
          total,
        }));
        setCategoryBreakdown(formattedData);
        // Recent Transactions
        setRecentTransactions(transactions.slice(0, 3));
      }
    }
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Expenses Card */}
      <Card className="bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle>Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-gray-800">${totalExpenses.toFixed(2)}</p>
        </CardContent>
      </Card>
      
      {/* Category Breakdown Card */}
      <Card className="bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {categoryBreakdown.map((category) => (
              <li key={category.name} className="flex justify-between text-gray-700">
                <span>{category.name}</span>
                <span>${category.total.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Recent Transactions Card */}
      <Card className="bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recentTransactions.map((t) => (
              <li key={t._id} className="flex justify-between text-gray-600">
                <span>{t.description}</span>
                <span className="text-sm text-gray-500">
                  {format(new Date(t.date), 'PP')}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
