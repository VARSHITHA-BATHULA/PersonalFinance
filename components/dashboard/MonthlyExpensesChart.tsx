'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MonthlyExpense } from '@/lib/types';

export function MonthlyExpensesChart() {
  const [data, setData] = useState<MonthlyExpense[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/transactions');
      if (res.ok) {
        const transactions = await res.json();
        const monthlyData: { [key: string]: number } = {};
        transactions.forEach((t: any) => {
          const month = t.date.slice(0, 7); // YYYY-MM
          monthlyData[month] = (monthlyData[month] || 0) + t.amount;
        });
        const formattedData = Object.entries(monthlyData).map(([month, total]) => ({
          month,
          total,
        }));
        setData(formattedData.sort((a, b) => a.month.localeCompare(b.month)));
      }
    }
    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} className="bg-white shadow-lg rounded-lg">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" className="text-sm text-gray-600" />
        <YAxis className="text-sm text-gray-600" />
        <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#ddd' }} />
        <Bar dataKey="total" fill="#FFA500" />
      </BarChart>
    </ResponsiveContainer>
  );
}
