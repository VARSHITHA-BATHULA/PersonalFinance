'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Budget, Transaction } from '@/lib/types';

interface BudgetData {
  category: string;
  budget: number;
  actual: number;
}

export function BudgetComparisionChart() {
  const [data, setData] = useState<BudgetData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [budgetRes, transactionRes] = await Promise.all([
          fetch('/api/budgets'),
          fetch('/api/transactions'),
        ]);

        if (!budgetRes.ok || !transactionRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const budgets: Budget[] = await budgetRes.json();
        const transactions: Transaction[] = await transactionRes.json();
        const currentMonth = new Date().toISOString().slice(0, 7);

        const actualData: { [key: string]: number } = {};
        transactions.forEach((t: Transaction) => {
          if (t.date.startsWith(currentMonth)) {
            actualData[t.category] = (actualData[t.category] || 0) + t.amount;
          }
        });

        const formattedData = budgets
          .filter((b) => b.month === currentMonth)
          .map((b) => ({
            category: b.category,
            budget: b.amount,
            actual: actualData[b.category] || 0,
          }));

        setData(formattedData);
      } catch (err) {
        setError('Failed to load budget comparison data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-orange-400 to-orange-500">
        <div className="text-white text-center p-6">
          <div className="loader animate-spin">Loading...</div> {/* Optional Spinner */}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-orange-100">
        <div className="text-orange-600 text-center p-6">
          <span className="text-xl font-semibold">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-6 w-full max-w-4xl mx-auto shadow-xl dark:shadow-lg transform transition-transform hover:scale-105 duration-300">
      <h2 className="text-3xl font-semibold text-center text-orange-800 mb-6">Budget vs Actual Comparison</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis dataKey="category" stroke="#4A4A4A" />
          <YAxis stroke="#4A4A4A" />
          <Tooltip contentStyle={{ backgroundColor: '#f97316', borderRadius: '10px', color: 'white' }} />
          <Legend iconSize={20} wrapperStyle={{ color: '#4A4A4A' }} />
          <Bar dataKey="budget" fill="url(#budgetGradient)" name="Budget" radius={[8, 8, 0, 0]} />
          <Bar dataKey="actual" fill="url(#actualGradient)" name="Actual" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <svg width="0" height="0">
        <defs>
          <linearGradient id="budgetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ff8a00" />
          </linearGradient>
          <linearGradient id="actualGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fdba74" />
            <stop offset="100%" stopColor="#fcd34d" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
