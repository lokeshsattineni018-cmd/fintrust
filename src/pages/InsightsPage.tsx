import { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Coffee, Plane, Home, ShoppingBag, TrendingUp } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { fadeUp, staggerContainer, staggerItem } from '../lib/motion';
import { CategorySpendChart } from '../components/charts/CategorySpendChart';
import { EmptyState } from '../components/shared/EmptyState';

function ProgressRing({ value, max, size = 140, strokeWidth = 10, color = '#10b981', label, sublabel }: {
  value: number; max: number; size?: number; strokeWidth?: number; color?: string; label: string; sublabel: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(Math.max(value / max, 0), 1);
  const dashOffset = circumference * (1 - percentage);

  return (
    <div className="flex flex-col items-center gap-6 group">
      <div className="relative" style={{ width: size, height: size }}>
        <div 
          className="absolute inset-0 rounded-full blur-2xl opacity-10 transition-opacity duration-700 group-hover:opacity-20" 
          style={{ backgroundColor: color }} 
        />
        <svg width={size} height={size} className="transform -rotate-90 relative z-10 transition-transform duration-700 group-hover:scale-105">
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke="#F1F5F9" strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke={color} strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
            style={{ strokeDasharray: circumference }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <span className="text-3xl font-bold font-display tracking-tighter text-zinc-900 leading-none">
             {Math.round(percentage * 100)}<span className="text-sm opacity-40 ml-0.5">%</span>
          </span>
        </div>
      </div>
      <div className="text-center space-y-1">
        <p className="text-sm font-bold text-zinc-900 uppercase tracking-widest leading-none">{label}</p>
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] leading-none">{sublabel}</p>
      </div>
    </div>
  );
}

const categoryIcons: Record<string, React.ElementType> = {
  Food: Coffee, Travel: Plane, Bills: Home, Shopping: ShoppingBag,
};

const categoryColors: Record<string, string> = {
  Food: 'text-zinc-500',
  Travel: 'text-zinc-500',
  Bills: 'text-zinc-500',
  Shopping: 'text-zinc-500',
};

export function InsightsPage() {
  const { transactions } = useDashboard();

  const exportCSV = useCallback(() => {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const rows = transactions.map(t => [
      t.date,
      `"${t.description}"`,
      t.category,
      t.type,
      t.amount.toString(),
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytical_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [transactions]);

  const stats = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const incomes = transactions.filter(t => t.type === 'income');
    const totalExpense = expenses.reduce((s, t) => s + t.amount, 0);
    const totalIncome = incomes.reduce((s, t) => s + t.amount, 0);

    const categorySpend: Record<string, number> = {};
    expenses.forEach(t => { categorySpend[t.category] = (categorySpend[t.category] || 0) + t.amount; });
    const topCategories = Object.entries(categorySpend).sort((a, b) => b[1] - a[1]);

    const avgExpense = expenses.length > 0 ? totalExpense / expenses.length : 0;
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;
    const budgetUsed = totalIncome > 0 ? (totalExpense / totalIncome) * 100 : 0;

    const largest = expenses.length > 0 
      ? expenses.reduce((max, t) => t.amount > max.amount ? t : max, expenses[0])
      : null;

    return { totalExpense, totalIncome, topCategories, avgExpense, savingsRate, budgetUsed, largest, expenseCount: expenses.length, incomeCount: incomes.length };
  }, [transactions]);

  if (transactions.length === 0) {
    return (
      <div className="mt-20">
        <EmptyState icon={Sparkles} title="No analysis available" description="Record transactions to generate intelligent insights." />
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="space-y-16 mt-2 max-w-6xl pb-32"
    >
      <motion.div variants={fadeUp}>
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-zinc-100 rounded-full border border-zinc-200 shadow-sm animate-slide-up">
            <TrendingUp size={14} className="text-zinc-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Heuristic Engine Active</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 font-display leading-none">Intelligence.</h1>
          <p className="text-zinc-500 mt-2 text-lg font-medium max-w-2xl leading-relaxed">
            Automated spending behavior mapping and predictive capital allocation insights.
          </p>
        </div>
      </motion.div>

      {/* Main Analysis Hub — Apple style */}
      <motion.div variants={staggerItem} className="glass-card squircle-32 p-12 lg:p-16 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-16 opacity-5 group-hover:opacity-10 transition-opacity">
          <Sparkles size={180} className="text-zinc-900" />
        </div>
        <div className="relative z-10 flex flex-col gap-12">
            <div className="space-y-1">
                <h3 className="font-display font-bold text-2xl text-zinc-900 tracking-tight">Audit Dashboard</h3>
                <p className="text-zinc-500 text-sm font-semibold uppercase tracking-widest">Statistical performance indicators</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              <ProgressRing
                value={Math.max(stats.savingsRate, 0)} max={100}
                color={stats.savingsRate >= 20 ? '#10b981' : '#f43f5e'}
                label="Liquid Savings"
                sublabel={stats.savingsRate >= 20 ? 'Optimal' : 'Deficit'}
              />
              <ProgressRing
                value={Math.min(stats.budgetUsed, 100)} max={100}
                color={stats.budgetUsed <= 80 ? '#10b981' : '#f59e0b'}
                label="Capital Usage"
                sublabel={`₹${(stats.totalExpense / 1000).toFixed(1)}k Audit`}
              />
              <ProgressRing
                value={stats.incomeCount} max={stats.incomeCount + stats.expenseCount}
                color="#000000"
                label="Inflow Ratio"
                sublabel={`${stats.incomeCount} Deposits`}
              />
              <ProgressRing
                value={stats.topCategories.length > 0 ? stats.topCategories[0][1] : 0}
                max={stats.totalExpense || 1}
                color="#6366f1"
                label="Sector Focus"
                sublabel={stats.topCategories[0]?.[0] || 'N/A'}
              />
            </div>
        </div>
      </motion.div>

      {/* Breakdown Section — Figma style */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <motion.div variants={staggerItem} className="glass-card squircle-32 p-10">
          <div className="flex items-center gap-4 mb-10 pb-6 border-b border-zinc-100">
             <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center text-white shadow-lg">
                <ShieldCheck size={20} className="text-white" />
             </div>
             <div className="space-y-0.5">
                <h3 className="font-display font-bold text-xl text-zinc-900 tracking-tight leading-none">Sector Allocation.</h3>
                <p className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest">Weighted expenditure analysis</p>
             </div>
          </div>
          <div className="space-y-8">
            {stats.topCategories.map(([name, amount], i) => {
              const percent = Math.round((amount / (stats.totalExpense || 1)) * 100);
              const Icon = categoryIcons[name] || Coffee;
              const colorClass = categoryColors[name] || 'bg-zinc-100 text-zinc-600';
              return (
                <div key={name} className="group cursor-default">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-2xl ${colorClass} flex items-center justify-center shadow-lg shadow-black/5 group-hover:scale-110 transition-transform`}>
                        <Icon size={18} strokeWidth={2.5} />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-sm font-bold text-zinc-900 uppercase tracking-wide leading-none">{name}</span>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{percent}% Weight</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <span className="text-base font-bold text-zinc-900 font-numeric tracking-tight">₹{amount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-50 rounded-full overflow-hidden border border-zinc-100/50">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.1 }}
                      className={`h-full rounded-full ${colorClass.split(' ')[0]}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <button 
            onClick={exportCSV}
            className="w-full mt-12 py-4 bg-zinc-50 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 border border-zinc-200 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all"
          >
             Download Analytical Report
          </button>
        </motion.div>

        <div className="space-y-10">
          <motion.div variants={staggerItem} className="glass-card squircle-32 p-8 overflow-hidden relative group">
             <CategorySpendChart />
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
