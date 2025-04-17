'use client';

import { useState, useEffect } from 'react';
import { Transaction } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';

export function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/transactions');
        if (!res.ok) throw new Error('Failed to fetch transactions');
        const data: Transaction[] = await res.json();
        setTransactions(data);
      } catch (err) {
        setError('There was an error loading transactions. Please try again later.');
        toast.error('Failed to load transactions');
      } finally {
        setIsLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  async function handleDelete(id: string) {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      const res = await fetch('/api/transactions', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error('Failed to delete transaction');
      
      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction._id !== id)
      );

      toast.success('Transaction deleted');
    } catch (error) {
      toast.error('Failed to delete transaction');
    } finally {
      setIsDeleting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="text-center p-4">
        <Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-500" />
        <p className="text-gray-500">Loading transactions...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  if (transactions.length === 0) {
    return <div className="text-center p-4 text-gray-500">No transactions found.</div>;
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <Card key={transaction._id} className="bg-gray-50 border border-gray-200 shadow-md hover:shadow-lg">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium text-gray-900">{transaction.description}</p>
              <p className="text-sm text-gray-500">
                {format(new Date(transaction.date), 'PPP')} - {transaction.category}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <p className="font-medium text-green-600">${transaction.amount.toFixed(2)}</p>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(transaction._id!)}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
