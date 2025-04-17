'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CategorySummary } from '@/lib/types';

const COLORS = ['#ADD8E6', '#90EE90', '#FFFF00', '#FFA07A', '#D8BFD8', '#FFB6C1']; 

export function CategoryPieChart() {
  const [data, setData] = useState<CategorySummary[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/transactions');
      if (res.ok) {
        const transactions = await res.json();
        const categoryData: { [key: string]: number } = {};
        transactions.forEach((t: any) => {
          categoryData[t.category] = (categoryData[t.category] || 0) + t.amount;
        });
        const formattedData = Object.entries(categoryData).map(([name, total]) => ({
          name,
          total,
        }));
        setData(formattedData);
      }
    }
    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="total"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
