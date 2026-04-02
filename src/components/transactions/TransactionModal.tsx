import { useState } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDashboard } from '../../context/DashboardContext';
import type { Transaction } from '../../data/mockData';

interface ModalProps {
  onClose: () => void;
  editingTransaction?: Transaction | null;
  /** Alias used by TransactionsTable */
  transaction?: Transaction | null;
}

function buildFormState(tx: Transaction | null) {
  if (!tx) {
    return {
      description: '',
      amount: '',
      category: 'Food',
      type: 'expense' as const,
      date: new Date().toISOString().split('T')[0],
    };
  }
  return {
    description: tx.description,
    amount: tx.amount.toString(),
    category: tx.category,
    type: tx.type,
    date: tx.date,
  };
}

export function TransactionModal({ onClose, editingTransaction, transaction }: ModalProps) {
  const { addTransaction, editTransaction } = useDashboard();
  const tx = transaction ?? editingTransaction ?? null;
  const isEditing = !!tx;

  const [formData, setFormData] = useState(() => buildFormState(tx));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    const txData = {
      ...formData,
      amount: Number(formData.amount),
    };

    if (isEditing && tx) {
      editTransaction(tx.id, txData);
    } else {
      addTransaction(txData);
    }
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 bg-zinc-900/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="relative bg-white dark:bg-[#111111] rounded-t-2xl sm:rounded-2xl w-full sm:max-w-[420px] max-h-[92dvh] overflow-y-auto border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-black/10 transition-all duration-300"
        initial={{ opacity: 0, y: 56, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      >
        <div className="w-full flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1.5 bg-zinc-300/80 dark:bg-zinc-700/80 rounded-full" />
        </div>

        <div className="flex items-center justify-between p-6 pb-2 relative z-10">
          <h2 className="text-xl font-headline font-bold text-zinc-900 dark:text-white tracking-tight">
            {isEditing ? 'Modify record' : 'Protocol input'}
          </h2>
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
            <X size={20} strokeWidth={2.5} />
          </motion.button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-8">
          <div className="flex rounded-2xl p-1 w-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 shadow-inner">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'expense' })}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${
                formData.type === 'expense' 
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg scale-[1.02]' 
                  : 'text-zinc-400'
              }`}
            >
              Debit
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'income' })}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${
                formData.type === 'income' 
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg scale-[1.02]' 
                  : 'text-zinc-400'
              }`}
            >
              Credit
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2.5">Capital Amount</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600 text-xl font-bold">₹</span>
                <input
                  type="number"
                  required
                  min="0.01"
                  step="0.01"
                  value={formData.amount}
                  onChange={e => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full border-2 border-zinc-100 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-white/20 rounded-2xl pl-10 pr-4 py-4 text-zinc-900 dark:text-white font-display font-bold text-3xl focus:outline-none bg-white dark:bg-zinc-950 transition-all placeholder:text-zinc-200 dark:placeholder:text-zinc-800"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2.5">Description</label>
                <input
                  type="text"
                  required
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-zinc-900/5 dark:focus:ring-white/5 bg-white dark:bg-zinc-950 transition-all"
                  placeholder="Memo..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2.5">Sector</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-sm font-bold text-zinc-700 dark:text-zinc-300 focus:outline-none bg-white dark:bg-zinc-950 cursor-pointer appearance-none"
                  >
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Bills">Bills</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Income">Income</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2.5">Timestamp</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-sm font-bold text-zinc-700 dark:text-zinc-300 focus:outline-none bg-white dark:bg-zinc-950"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <motion.button
              type="submit"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-2xl bg-zinc-900 dark:bg-white py-4.5 font-display text-sm font-bold text-white dark:text-zinc-900 shadow-2xl shadow-zinc-900/20 dark:shadow-white/5 transition-all border border-zinc-950 dark:border-zinc-200"
            >
              {isEditing ? 'COMMIT CHANGES' : 'AUTHORIZE ENTRY'}
            </motion.button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Cancel protocol
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
