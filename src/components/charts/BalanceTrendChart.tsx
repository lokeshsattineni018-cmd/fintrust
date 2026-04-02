import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getBalanceTrend } from '../../data/mockData';
import { useDashboard } from '../../context/DashboardContext';
import { motion } from 'framer-motion';

export function BalanceTrendChart() {
  const { transactions, darkMode } = useDashboard();
  const data = getBalanceTrend(transactions);

  const gridColor = darkMode ? '#2a2a2a' : '#e2e8f0';
  const tickColor = darkMode ? '#71717a' : '#64748B';
  const tooltipBg = darkMode ? 'rgba(26,26,26,0.95)' : 'rgba(255,255,255,0.95)';
  const tooltipBorder = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(99, 102, 241, 0.2)';
  const tooltipText = darkMode ? '#fafafa' : '#0F172A';
  const tooltipLabel = darkMode ? '#a1a1aa' : '#64748B';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card rounded-xl p-6 lg:p-8 w-full h-[400px] flex flex-col relative overflow-hidden"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-zinc-900 dark:text-white font-headline">Balance trend</h3>
        <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wide">7 days</span>
      </div>

      <div className="flex-grow w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="strokeBalance" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} opacity={0.6} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: tickColor, fontSize: 12, fontWeight: 500 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: tickColor, fontSize: 12, fontWeight: 500 }} tickFormatter={(value) => `₹${value / 1000}k`} dx={-10} />
            <Tooltip
              contentStyle={{ backgroundColor: tooltipBg, backdropFilter: 'blur(12px)', border: `1px solid ${tooltipBorder}`, borderRadius: '12px', boxShadow: '0 10px 40px -10px rgba(99, 102, 241, 0.25)', padding: '12px' }}
              labelStyle={{ color: tooltipLabel, fontWeight: 600, marginBottom: '8px' }}
              itemStyle={{ color: tooltipText, fontWeight: 600 }}
              formatter={(value) => [`₹${Number(value ?? 0).toLocaleString()}`, 'Balance']}
            />
            <Area type="monotone" dataKey="balance" stroke="url(#strokeBalance)" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" activeDot={{ r: 6, fill: '#6366f1', stroke: darkMode ? '#1a1a1a' : '#fff', strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
