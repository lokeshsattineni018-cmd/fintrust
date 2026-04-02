import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, AlertCircle, BadgeCheck, TrendingDown, PiggyBank, BarChart3 } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { EmptyState } from '../shared/EmptyState';
import { staggerContainer, staggerItem, viewportOnce } from '../../lib/motion';

export function InsightsPanel() {
  const { transactions } = useDashboard();

  const insights = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const incomes = transactions.filter(t => t.type === 'income');

    const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);
    const totalIncome = incomes.reduce((sum, t) => sum + t.amount, 0);

    if (transactions.length === 0) return null;

    // Highest spending category
    const categorySpend: Record<string, number> = {};
    expenses.forEach(t => {
      categorySpend[t.category] = (categorySpend[t.category] || 0) + t.amount;
    });
    const topCategory = Object.entries(categorySpend).sort((a, b) => b[1] - a[1])[0];
    const topCategoryPercent = totalExpense > 0 && topCategory
      ? Math.round((topCategory[1] / totalExpense) * 100)
      : 0;

    // Savings rate
    const savingsRate = totalIncome > 0
      ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100)
      : 0;

    // Income vs expense ratio
    const expenseRatio = totalIncome > 0
      ? Math.round((totalExpense / totalIncome) * 100)
      : 0;

    return {
      topCategory,
      topCategoryPercent,
      totalExpense,
      totalIncome,
      savingsRate,
      expenseRatio,
      transactionCount: transactions.length,
    };
  }, [transactions]);

  if (!insights) {
    return (
      <div className="glass-premium p-6 rounded-xl">
        <EmptyState
          icon={Lightbulb}
          title="No insights yet"
          description="Add transactions to see smart insights about your finances."
        />
      </div>
    );
  }

  const cards = [
    // Top spending category
    insights.topCategory && {
      icon: TrendingDown,
      iconColor: 'text-error',
      iconBg: 'bg-error-container/40',
      content: (
        <p className="text-sm text-on-surface-variant leading-relaxed">
          <span className="font-bold text-on-surface">{insights.topCategory[0]}</span> is your top spending category at{' '}
          <span className="font-bold text-on-surface">{insights.topCategoryPercent}%</span> of total expenses
          (₹{insights.topCategory[1].toLocaleString('en-IN')}).
        </p>
      ),
    },
    // Budget usage
    {
      icon: insights.expenseRatio > 80 ? AlertCircle : BadgeCheck,
      iconColor: insights.expenseRatio > 80 ? 'text-error' : 'text-tertiary',
      iconBg: insights.expenseRatio > 80 ? 'bg-error-container/40' : 'bg-tertiary-container/40',
      content: (
        <p className="text-sm text-on-surface-variant leading-relaxed">
          You've spent <span className="font-bold text-on-surface">{insights.expenseRatio}%</span> of your income.{' '}
          {insights.expenseRatio > 80
            ? 'Consider reducing non-essential spending.'
            : 'Great job keeping expenses under control!'}
        </p>
      ),
    },
    // Savings rate
    {
      icon: PiggyBank,
      iconColor: insights.savingsRate >= 20 ? 'text-tertiary' : 'text-error',
      iconBg: insights.savingsRate >= 20 ? 'bg-tertiary-container/40' : 'bg-error-container/40',
      content: (
        <p className="text-sm text-on-surface-variant leading-relaxed">
          Your savings rate is{' '}
          <span className={`font-bold ${insights.savingsRate >= 20 ? 'text-tertiary' : 'text-error'}`}>
            {insights.savingsRate}%
          </span>.{' '}
          {insights.savingsRate >= 20
            ? "You're saving well — keep it up!"
            : 'Aim for at least 20% savings rate.'}
        </p>
      ),
    },
    // Transaction volume
    {
      icon: BarChart3,
      iconColor: 'text-primary',
      iconBg: 'bg-primary-fixed/40',
      content: (
        <p className="text-sm text-on-surface-variant leading-relaxed">
          <span className="font-bold text-on-surface">{insights.transactionCount}</span> transactions tracked with a net flow of{' '}
          <span className={`font-bold ${insights.totalIncome - insights.totalExpense >= 0 ? 'text-tertiary' : 'text-error'}`}>
            {insights.totalIncome - insights.totalExpense >= 0 ? '+' : '-'}₹{Math.abs(insights.totalIncome - insights.totalExpense).toLocaleString('en-IN')}
          </span>.
        </p>
      ),
    },
  ].filter(Boolean) as { icon: React.ElementType; iconColor: string; iconBg: string; content: React.ReactNode }[];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="glass-premium space-y-5 rounded-2xl p-6"
    >
      <h3 className="font-display flex items-center gap-2 text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/15 to-teal-500/10 text-emerald-700 ring-1 ring-emerald-500/20">
          <Lightbulb size={18} strokeWidth={2} />
        </span>
        Insights
      </h3>

      <div className="space-y-2.5">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            className="flex items-start gap-3 rounded-xl border border-zinc-100/80 dark:border-zinc-800 bg-gradient-to-br from-zinc-50/80 to-white dark:from-zinc-800/50 dark:to-zinc-900 p-4 shadow-sm"
          >
            <div className={`w-9 h-9 rounded-xl ${card.iconBg} flex items-center justify-center flex-shrink-0`}>
              <card.icon size={18} className={card.iconColor} strokeWidth={2.5} />
            </div>
            {card.content}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
