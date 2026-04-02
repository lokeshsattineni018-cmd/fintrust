import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboard } from '../context/DashboardContext';
import { SummaryCards } from '../components/dashboard/SummaryCards';
import { ChartsSection } from '../components/dashboard/ChartsSection';
import { TransactionsTable } from '../components/transactions/TransactionsTable';
import { TransactionModal } from '../components/transactions/TransactionModal';
import { InsightsPanel } from '../components/dashboard/InsightsPanel';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '../lib/motion';

export function Dashboard() {
  const { role, setRole, searchQuery, setSearchQuery } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="relative z-10 flex flex-col gap-10"
    >
      {/* Mobile Actions - Figma style */}
      <motion.section className="flex flex-col gap-4 lg:hidden" variants={fadeUp}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                role === 'admin' ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg' : 'text-zinc-400 dark:text-zinc-500'
              }`}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => setRole('viewer')}
              className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                role === 'viewer' ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg' : 'text-zinc-400 dark:text-zinc-500'
              }`}
            >
              View
            </button>
          </div>
          {role === 'admin' && (
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center h-11 w-11 rounded-2xl bg-zinc-900 text-white shadow-xl shadow-zinc-900/10 border border-zinc-950"
            >
              <Plus size={20} strokeWidth={3} />
            </motion.button>
          )}
        </div>
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" strokeWidth={2.5} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search records…"
            className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-3.5 pl-11 pr-4 text-sm font-semibold text-zinc-900 dark:text-white shadow-sm focus:border-zinc-900 dark:focus:border-zinc-600 focus:outline-none focus:ring-4 focus:ring-zinc-900/5 transition-all placeholder:text-zinc-400"
          />
        </div>
      </motion.section>

      <motion.div variants={staggerItem}>
        <SummaryCards />
      </motion.div>

      <motion.div variants={staggerItem} viewport={viewportOnce} className="grid grid-cols-1 gap-8">
        <ChartsSection />
      </motion.div>

      <motion.section variants={staggerItem} className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TransactionsTable />
        </div>
        <div className="space-y-8">
          <InsightsPanel />
        </div>
      </motion.section>

      <AnimatePresence>
        {isModalOpen && <TransactionModal key="create-v2" onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}
