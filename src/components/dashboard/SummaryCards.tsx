import { useMemo } from 'react';
import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDashboard } from '../../context/DashboardContext';
import { staggerContainer, staggerItem, viewportOnce } from '../../lib/motion';

const cardStyles = [
  { icon: 'text-zinc-400' },
  { icon: 'text-zinc-400' },
  { icon: 'text-zinc-400' },
];

export function SummaryCards() {
  const { transactions } = useDashboard();

  const stats = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const balance = income - expenses;
    return { balance, income, expenses };
  }, [transactions]);

  const cards = [
    {
      title: 'Current Balance',
      amount: stats.balance,
      change: '+14.2%',
      isPositive: true,
      subtext: 'Up from ₹12,400',
      icon: Wallet,
    },
    {
      title: 'Monthly Income',
      amount: stats.income,
      change: '+2.1%',
      isPositive: true,
      subtext: 'Next: ₹8k on April 5',
      icon: TrendingUp,
    },
    {
      title: 'Monthly Expenses',
      amount: stats.expenses,
      change: '-1.5%',
      isPositive: false,
      subtext: 'Target: ₹15,000',
      icon: CreditCard,
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="grid grid-cols-1 gap-6 md:grid-cols-3"
    >
      {cards.map((card, idx) => {
        const style = cardStyles[idx] ?? cardStyles[1];
        return (
          <motion.div
            key={card.title}
            variants={staggerItem}
            className="group relative flex flex-col p-8 glass-card squircle-32 overflow-hidden"
          >
            <div className="flex justify-between items-start mb-10">
              <div className={`p-2 transition-transform duration-500 ${style.icon}`}>
                <card.icon size={24} strokeWidth={1.5} />
              </div>
              <div className={`flex items-center gap-1 rounded-full px-3 py-1 font-numeric text-[11px] font-bold tracking-tight shadow-sm ${
                card.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
              }`}>
                {card.isPositive ? <ArrowUpRight size={14} strokeWidth={2} /> : <ArrowDownRight size={14} strokeWidth={2} />}
                {card.change}
              </div>
            </div>
            
            <div className="space-y-2 mt-auto">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 transition-colors">{card.title}</h3>
              <p className="font-numeric text-[44px] font-medium tracking-tighter text-zinc-900 tabular-nums font-display leading-none">
                ₹{Math.abs(card.amount).toLocaleString('en-IN')}
              </p>
            </div>

            <div className="mt-8 flex items-center gap-2">
              <p className="text-sm font-medium text-zinc-500">{card.subtext}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
