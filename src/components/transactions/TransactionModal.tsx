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
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm max-h-[92dvh] overflow-y-auto border border-zinc-200 shadow-xl"
        initial={{ opacity: 0, y: 56, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      >
        <div className="w-full flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1.5 bg-slate-300/80 rounded-full" />
        </div>

        <div className="flex items-center justify-between p-6 relative z-10">
          <h2 className="text-lg font-headline font-semibold text-zinc-900">
            {isEditing ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-white/60 rounded-full transition-colors"
          >
            <X size={20} strokeWidth={2.5} />
          </motion.button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-8 space-y-6">
          <div className="flex rounded-lg p-1 w-full border border-zinc-200 bg-zinc-50">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'expense' })}
              className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-colors ${
                formData.type === 'expense' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500'
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'income' })}
              className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-colors ${
                formData.type === 'income' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500'
              }`}
            >
              Income
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5">Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-medium">₹</span>
                <input
                  type="number"
                  required
                  min="0.01"
                  step="0.01"
                  value={formData.amount}
                  onChange={e => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full border border-zinc-200 rounded-lg pl-8 pr-3 py-3 text-zinc-900 font-headline font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5">Description</label>
              <input
                type="text"
                required
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300"
                placeholder="e.g. Coffee"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1.5">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 bg-white cursor-pointer"
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
                <label className="block text-xs font-medium text-zinc-500 mb-1.5">Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <motion.button
              type="submit"
              whileTap={{ scale: 0.99 }}
              className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3.5 font-headline text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 ring-1 ring-white/20 hover:brightness-110"
            >
              {isEditing ? 'Save changes' : 'Save transaction'}
            </motion.button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 text-sm font-medium text-zinc-600 hover:text-zinc-900"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
