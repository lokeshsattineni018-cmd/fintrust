import { useState } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
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

        <div className="flex items-center gap-3 p-6 pb-2 relative z-10 border-b border-zinc-100 dark:border-zinc-800/50">
          <div className="w-9 h-9 bg-zinc-900 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-zinc-900 shadow-xl shadow-zinc-900/20">
             <ArrowUpRight size={22} strokeWidth={3} />
          </div>
          <h2 className="text-xl font-headline font-bold text-zinc-900 dark:text-white tracking-tight">
            {isEditing ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={onClose}
            className="ml-auto p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
            <X size={20} strokeWidth={2.5} />
          </motion.button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="flex rounded-xl p-1 w-full bg-zinc-100 dark:bg-zinc-900">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'expense' })}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                formData.type === 'expense' 
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' 
                  : 'text-zinc-500'
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'income' })}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                formData.type === 'income' 
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' 
                  : 'text-zinc-500'
              }`}
            >
              Income
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">₹</span>
                <input
                  type="number"
                  required
                  min="0.01"
                  step="0.01"
                  value={formData.amount}
                  onChange={e => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-3.5 text-zinc-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 bg-white dark:bg-zinc-950 transition-all font-numeric text-lg"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">Description</label>
                <input
                  type="text"
                  required
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 dark:text-white focus:outline-none bg-white dark:bg-zinc-950 transition-all"
                  placeholder="Transaction details"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-900 dark:text-white focus:outline-none bg-white dark:bg-zinc-950 cursor-pointer appearance-none"
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
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-900 dark:text-white focus:outline-none bg-white dark:bg-zinc-950"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-xl bg-zinc-900 dark:bg-white py-4 font-bold text-white dark:text-zinc-900 shadow-lg transition-all"
            >
              {isEditing ? 'Save Changes' : 'Add Transaction'}
            </motion.button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-sm font-semibold text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
