'use client';

import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toast } from 'sonner';

const formSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  month: z.string().regex(/^\d{4}-\d{2}$/, 'Invalid month format (YYYY-MM)')
});

export function BudgetForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: '',
      amount: 0,
      month: new Date().toISOString().slice(0, 7)
    }
  });

  // Hardcoded categories
  const categories = [
    { _id: '1', name: 'Food' },
    { _id: '2', name: 'Travel' },
    { _id: '3', name: 'Utilities' },
    { _id: '4', name: 'Entertainment' },
    { _id: '5', name: 'Groceries' },
    { _id: '6', name: 'Salary' },
    { _id: '7', name: 'Other' }
  ];

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const res = await fetch('/api/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      if (!res.ok) throw new Error('Failed to set budget');
      toast.success('Budget set successfully');
      form.reset();
    } catch (error) {
      toast.error('Failed to set budget');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-dark-800 p-6 rounded-lg shadow-xl"
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-dark-700 text-black hover:bg-dark-600 rounded-lg shadow-lg transition duration-200 ease-in-out opacity-90">
                    <SelectValue placeholder="Select a category" className="text-black" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent
                  side="bottom"
                  sideOffset={4}
                  className="bg-dark-700 text-black rounded-lg shadow-lg mt-1 z-50 max-h-60 overflow-y-auto opacity-90"
                >
                  {categories.map((category) => (
                    <SelectItem
                      key={category._id}
                      value={category.name}
                      className="text-black hover:bg-orange-500 hover:text-white"
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Budget Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  className="bg-dark-700 text-black placeholder-gray-400"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="month"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Month</FormLabel>
              <FormControl>
                <Input type="month" {...field} className="bg-dark-700 text-black" />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-orange-600 text-black hover:bg-orange-700"
        >
          {isLoading ? 'Setting Budget...' : 'Set Budget'}
        </Button>
      </form>
    </Form>
  );
}
