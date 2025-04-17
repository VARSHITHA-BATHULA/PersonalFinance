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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center text-primary">Your Financial Overview</h1>
      <SummaryCards />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add Transaction Card */}
        <div className="col-span-1">
          <h2 className="text-2xl font-semibold text-center text-primary">Add a New Transaction</h2>
          <Card>
            <CardHeader>
              <CardTitle>Add Transaction</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionForm />
            </CardContent>
          </Card>
        </div>

        {/* Monthly Expenses Chart Card */}
        <div className="col-span-1">
          <h2 className="text-2xl font-semibold text-center text-primary">Monthly Expense Overview</h2>
          <Card>
            <CardHeader>
              <CardTitle>Monthly Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <MonthlyExpensesChart />
            </CardContent>
          </Card>
        </div>

        {/* Category Breakdown Card */}
        <div className="col-span-1">
          <h2 className="text-2xl font-semibold text-center text-primary">Expense Category Breakdown</h2>
          <Card>
            <CardHeader>
              <CardTitle>Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <CategoryPieChart />
            </CardContent>
          </Card>
        </div>

        {/* Budget vs Actual Chart Card */}
        <div className="col-span-1">
          <h2 className="text-2xl font-semibold text-center text-primary">Budget vs Actual Comparison</h2>
          <Card>
            <CardHeader>
              <CardTitle>Budget vs Actual</CardTitle>
            </CardHeader>
            <CardContent>
              <BudgetComparisionChart />
            </CardContent>
          </Card>
        </div>

        {/* Set Budget Card */}
        <div className="col-span-1">
          <h2 className="text-2xl font-semibold text-center text-primary">Set Your Budget</h2>
          <Card>
            <CardHeader>
              <CardTitle>Set Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <BudgetForm />
            </CardContent>
          </Card>
        </div>

        {/* Spending Insights Card */}
        <div className="col-span-1">
          <h2 className="text-2xl font-semibold text-center text-primary">Spending Insights</h2>
          <Card>
            <CardHeader>
              <CardTitle>Spending Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <InsightsPanel />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Transactions Card */}
      <h2 className="text-2xl font-semibold text-center text-primary">Recent Transactions</h2>
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionList />
        </CardContent>
      </Card>
    </div>
  );
}
