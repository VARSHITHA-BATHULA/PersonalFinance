import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { MonthlyExpensesChart } from '@/components/dashboard/MonthlyExpensesChart';
import { CategoryPieChart } from '@/components/dashboard/CategoryPieChart';
import { BudgetComparisionChart } from '@/components/dashboard/BudgetComparisionChart';

import { InsightsPanel } from '@/components/dashboard/InsightsPanel';
import { TransactionForm } from '@/components/dashboard/TransactionForm';
import { TransactionList } from '@/components/dashboard/TransactionList';
import { BudgetForm } from '@/components/dashboard/BudgetForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/*************  ✨ Windsurf Command 🌟  *************/

export default async function Dashboard() {
  return (
    <div className="space-y-6 px-4 py-6 bg-gray-50 dark:bg-gray-900">
      {/* Summary Cards */}
      <SummaryCards />

      {/* Grid layout with cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Larger card in first row */}
        <Card className="lg:col-span-2 hover:scale-105 transition-transform duration-300 shadow-md min-h-[300px]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Add Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionForm />
          </CardContent>
        </Card>

        {/* Smaller cards */}
        <Card className="hover:scale-105 transition-transform duration-300 shadow-md min-h-[300px]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlyExpensesChart />
          </CardContent>
        </Card>

        <Card className="hover:scale-105 transition-transform duration-300 shadow-md min-h-[300px]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryPieChart />
          </CardContent>
        </Card>

        {/* Larger card in next row */}
        <Card className="lg:col-span-2 hover:scale-105 transition-transform duration-300 shadow-md min-h-[300px]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Budget vs Actual</CardTitle>
          </CardHeader>
          <CardContent>
            <BudgetComparisionChart />
          </CardContent>
        </Card>

        {/* Smaller cards */}
        <Card className="hover:scale-105 transition-transform duration-300 shadow-md min-h-[300px]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Set Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <BudgetForm />
          </CardContent>
        </Card>

        <Card className="hover:scale-105 transition-transform duration-300 shadow-md min-h-[300px]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Spending Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <InsightsPanel />
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions card */}
      <Card className="hover:scale-105 transition-transform duration-300 shadow-md min-h-[300px]">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionList />
        </CardContent>
      </Card>
    </div>
  );
}
