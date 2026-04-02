import { useState } from 'react';
import { Plus, Download, History } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { TransactionsTable } from '../components/transactions/TransactionsTable';
import { TransactionModal } from '../components/transactions/TransactionModal';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem } from '../lib/motion';
export function ActivityPage() {
  const { filteredTransactions, role } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalIn = filteredTransactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalOut = filteredTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  const exportCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const rows = filteredTransactions.map(t => [t.date, `"${t.description}"`, t.category, t.type, t.amount.toString()]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_fintrust_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="space-y-16 mt-2 max-w-6xl pb-32"
    >
      <motion.div variants={fadeUp}>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full border border-zinc-200 dark:border-zinc-700 shadow-[inset_0_1px_1px_rgba(0,0,0,0.02)]">
               <History size={12} className="text-zinc-400" />
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Audit Protocol Active</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-white font-display leading-none">Journal.</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-lg font-medium max-w-2xl leading-relaxed">
              Real-time audit log of your financial ecosystem. Every movement, documented with precision.
            </p>
          </div>
          <div className="flex gap-4">
            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={exportCSV}
              className="px-6 py-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[13px] font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 flex items-center gap-2.5 transition-all shadow-sm"
            >
              <Download size={18} strokeWidth={2.5} /> Archive dataset
            </motion.button>
            {role === 'admin' && (
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setIsModalOpen(true)}
                className="bg-zinc-900 dark:bg-white px-6 py-3.5 rounded-2xl text-[13px] font-bold text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 flex items-center gap-2.5 shadow-2xl shadow-zinc-900/20 transition-all border border-zinc-950 dark:border-zinc-200"
              >
                <Plus size={18} strokeWidth={3} /> Record Entry
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { label: 'Event volume', value: filteredTransactions.length, valClass: 'text-zinc-900 dark:text-white', sub: 'Total records' },
          { label: 'Credits (In)', value: `₹${totalIn.toLocaleString('en-IN')}`, valClass: 'text-emerald-500', sub: 'Gross revenue' },
          { label: 'Debits (Out)', value: `-₹${totalOut.toLocaleString('en-IN')}`, valClass: 'text-rose-500', sub: 'Spending volume' },
          {
            label: 'Net differential',
            value: `₹${(totalIn - totalOut).toLocaleString('en-IN')}`,
            valClass: totalIn - totalOut >= 0 ? 'text-emerald-500' : 'text-rose-500',
            sub: 'Liquidity shift'
          },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            variants={staggerItem}
            className="glass-card squircle-32 p-8 overflow-hidden group bg-white dark:bg-[#111111]"
          >
             <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400 mb-2 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">{stat.label}</p>
             <p className={`text-2xl font-bold font-numeric ${stat.valClass} tracking-tight font-display mb-1`}>{stat.value}</p>
             <p className="text-[11px] font-bold text-zinc-400 group-hover:text-zinc-500 italic transition-colors leading-relaxed">
                {stat.sub}
             </p>
          </motion.div>
        ))}
      </motion.div>



      {/* Unified Data Section */}
      <div className="pt-8 w-full animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out">
        <TransactionsTable />
      </div>

      <AnimatePresence>
        {isModalOpen && <TransactionModal key="create-activity-pro" onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}
