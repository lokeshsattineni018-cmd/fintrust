import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { getCategorySpend } from '../../data/mockData';
import { useDashboard } from '../../context/DashboardContext';
import { motion } from 'framer-motion';

const COLORS = ['#6366f1', '#10b981', '#f43f5e', '#f59e0b', '#8b5cf6'];

export function CategorySpendChart() {
  const { transactions } = useDashboard();
  const data = getCategorySpend(transactions);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      className="glass-card rounded-xl p-6 w-full h-full flex flex-col relative overflow-hidden"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-zinc-900 font-headline">Spending by category</h3>
        <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wide">Top 5</span>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6 flex-grow w-full min-w-0">
        <div className="relative w-32 h-32 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={60}
                paddingAngle={3}
                stroke="transparent"
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(99, 102, 241, 0.12)',
                  padding: '8px 12px',
                }}
                itemStyle={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#0F172A',
                }}
                formatter={(value) => `₹${Number(value ?? 0).toLocaleString()}`}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</span>
          </div>
        </div>

        <div className="flex-grow space-y-4 w-full min-w-0">
          {data.map((item, index) => {
            const percentage = Math.round(
              (item.value / data.reduce((sum, i) => sum + i.value, 0)) * 100
            );

            return (
              <div key={item.name} className="flex flex-col gap-1.5 w-full min-w-0">
                <div className="flex justify-between items-center w-full min-w-0 gap-3">
                  <div className="flex items-center gap-2 mb-1 min-w-0 flex-1">
                    <div
                      className="w-2.5 h-2.5 rounded-full shadow-sm flex-shrink-0"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-slate-600 font-semibold text-[13px] truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[13px] font-bold text-slate-900">
                      ₹{item.value.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md min-w-[2.5rem] text-center border border-slate-200/50">
                      {percentage}%
                    </span>
                  </div>
                </div>

                <div className="w-full h-1.5 bg-slate-100/80 rounded-full overflow-hidden flex-shrink-0">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: 'easeOut', delay: index * 0.08 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
