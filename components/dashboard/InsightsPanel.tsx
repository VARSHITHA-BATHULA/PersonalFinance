'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction, Budget } from '@/lib/types';

export function InsightsPanel() {
  const [insights, setInsights] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [transactionRes, budgetRes] = await Promise.all([
        fetch('/api/transactions'),
        fetch('/api/budgets'),
      ]);
      if (transactionRes.ok && budgetRes.ok) {
        const transactions: Transaction[] = await transactionRes.json();
        const budgets: Budget[] = await budgetRes.json();
        const currentMonth = new Date().toISOString().slice(0, 7);

        const insightsList: string[] = [];

        // High Spending Categories
        const categoryData: { [key: string]: number } = {};
        transactions.forEach((t) => {
          if (t.date.startsWith(currentMonth)) {
            categoryData[t.category] = (categoryData[t.category] || 0) + t.amount;
          }
        });
        const topCategory = Object.entries(categoryData).sort((a, b) => b[1] - a[1])[0];
        if (topCategory && topCategory[1] > 500) {
          insightsList.push(`You're spending a lot on ${topCategory[0]} ($${topCategory[1].toFixed(2)}). Consider reviewing these expenses.`);
        }

        // Budget Overruns
        budgets
          .filter((b) => b.month === currentMonth)
          .forEach((b) => {
            const actual = categoryData[b.category] || 0;
            if (actual > b.amount) {
              insightsList.push(`You've exceeded your ${b.category} budget by $${(actual - b.amount).toFixed(2)}.`);
            }
          });

        // Spending Trends
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        const lastMonthKey = lastMonth.toISOString().slice(0, 7);
        const currentMonthTotal = Object.values(categoryData).reduce((sum, val) => sum + val, 0);
        const lastMonthData: { [key: string]: number } = {};
        transactions.forEach((t) => {
          if (t.date.startsWith(lastMonthKey)) {
            lastMonthData[t.category] = (lastMonthData[t.category] || 0) + t.amount;
          }
        });
        const lastMonthTotal = Object.values(lastMonthData).reduce((sum, val) => sum + val, 0);
        if (currentMonthTotal > lastMonthTotal * 1.2) {
          insightsList.push(`Your spending this month is significantly higher than last month ($${currentMonthTotal.toFixed(2)} vs $${lastMonthTotal.toFixed(2)}).`);
        }

        setInsights(insightsList.length > 0 ? insightsList : ['No significant insights at this time. Keep tracking your expenses!']);
      }
    }
    fetchData();
  }, []);

  return (
    <Card className="bg-white shadow-lg rounded-lg border border-gray-200 p-4">
      <CardHeader className="bg-orange-100 p-3 rounded-t-lg">
        <CardTitle className="text-xl font-semibold text-orange-800">Spending Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {insights.map((insight, index) => (
            <li key={index} className="text-sm text-gray-800">{insight}</li>
          ))}
        </ul>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
          Button Text
        </button>
      </CardContent>
    </Card>
  );
}
