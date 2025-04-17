'use client';

import { Home, PieChart, Wallet, BarChart } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Transactions', href: '/dashboard/transactions', icon: Wallet },
    { name: 'Categories', href: '/dashboard/categories', icon: PieChart },
    { name: 'Budgets', href: '/dashboard/budgets', icon: BarChart },
  ];

  return (
    <aside className="w-64 bg-card shadow-md hidden md:block">
      <div className="p-4">
        <img src="/logo.png" alt="Logo" className="h-10 mx-auto" />
      </div>
      <nav className="mt-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center px-4 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              'transition-colors'
            )}
          >
            <item.icon className="w-5 h-5 mr-2" />
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}