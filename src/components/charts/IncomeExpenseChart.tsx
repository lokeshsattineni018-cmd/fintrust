import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getIncomeVsExpense } from '../../data/mockData';
import { useDashboard } from '../../context/DashboardContext';
import { motion } from 'framer-motion';

export function IncomeExpenseChart() {
  const { filteredTransactions, darkMode } = useDashboard();
  const data = getIncomeVsExpense(filteredTransactions);

  const gridColor = darkMode ? '#2a2a2a' : '#F1F5F9';
  const tickColor = darkMode ? '#71717a' : '#64748B';
  const tooltipBg = darkMode ? 'rgba(26,26,26,0.95)' : 'rgba(255,255,255,0.95)';
  const tooltipBorder = darkMode ? 'rgba(255,255,255,0.1)' : '#E2E8F0';
  const tooltipLabel = darkMode ? '#a1a1aa' : '#64748B';
  const cursorFill = darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(248, 250, 252, 0.9)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card rounded-xl p-6 w-full h-[400px] flex flex-col relative overflow-hidden"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-zinc-900 dark:text-white font-headline">Income vs expenses</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-sm" />
            <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded bg-gradient-to-br from-rose-400 to-rose-600 shadow-sm" />
            <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Expense</span>
          </div>
        </div>
      </div>

      <div className="flex-grow w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barGap={6}>
            <defs>
              <linearGradient id="barIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="barExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fb7185" />
                <stop offset="100%" stopColor="#e11d48" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: tickColor, fontSize: 12, fontWeight: 500 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: tickColor, fontSize: 12, fontWeight: 500 }} tickFormatter={(value) => `₹${value / 1000}k`} dx={-10} />
            <Tooltip
              cursor={{ fill: cursorFill }}
              contentStyle={{ backgroundColor: tooltipBg, backdropFilter: 'blur(12px)', border: `1px solid ${tooltipBorder}`, borderRadius: '12px', boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)', padding: '12px' }}
              formatter={(value) => `₹${Number(value ?? 0).toLocaleString()}`}
              labelStyle={{ color: tooltipLabel, fontWeight: 600, marginBottom: '8px' }}
            />
            <Bar dataKey="income" fill="url(#barIncome)" radius={[6, 6, 0, 0]} maxBarSize={40} />
            <Bar dataKey="expense" fill="url(#barExpense)" radius={[6, 6, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
