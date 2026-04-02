import { useState, useMemo } from 'react';
import { Coffee, Plane, Home, ShoppingBag, TrendingUp, HelpCircle, ArrowUpRight, ArrowDownLeft, Pencil, Trash2, ChevronUp, ChevronDown, Search, X } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { TransactionModal } from './TransactionModal';
import { EmptyState } from '../shared/EmptyState';
import { motion, AnimatePresence } from 'framer-motion';
import type { Transaction } from '../../data/mockData';

const categoryIcons: Record<string, React.ElementType> = {
  Food: Coffee, Travel: Plane, Bills: Home,
  Shopping: ShoppingBag, Income: TrendingUp, Other: HelpCircle,
};

type SortFieldKey = 'date' | 'amount' | 'description' | 'category';

function SortHeaderIcon({
  field,
  sortField,
  sortDirection,
}: {
  field: SortFieldKey;
  sortField: SortFieldKey;
  sortDirection: 'asc' | 'desc';
}) {
  if (sortField !== field) return <div className="w-4 h-4" />;
  return sortDirection === 'asc' ? (
    <ChevronUp className="w-4 h-4 text-zinc-900 dark:text-white" />
  ) : (
    <ChevronDown className="w-4 h-4 text-zinc-900 dark:text-white" />
  );
}

export function TransactionsTable() {
  const {
    filteredTransactions, role, deleteTransaction,
    searchQuery, setSearchQuery,
    filterType, setFilterType,
    filterCategory, setFilterCategory,
    sortField, sortDirection, toggleSort,
  } = useDashboard();

  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  const categories = useMemo(() => Array.from(new Set(filteredTransactions.map(t => t.category))), [filteredTransactions]);

  const displayData = useMemo(() => {
    return [...filteredTransactions].sort((a, b) => {
      const dir = sortDirection === 'asc' ? 1 : -1;
      if (sortField === 'date') return (new Date(a.date).getTime() - new Date(b.date).getTime()) * dir;
      if (sortField === 'amount') return (a.amount - b.amount) * dir;
      if (sortField === 'description') return a.description.localeCompare(b.description) * dir;
      if (sortField === 'category') return a.category.localeCompare(b.category) * dir;
      return 0;
    });
  }, [filteredTransactions, sortField, sortDirection]);

  const clearFilters = () => {
    setSearchQuery('');
    setFilterType('all');
    setFilterCategory('all');
  };

  const hasFilters = searchQuery || filterType !== 'all' || filterCategory !== 'all';

  return (
    <>
      <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl overflow-hidden glass-card">
        <div className="p-8 pb-4">
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-end border-b border-zinc-100 dark:border-zinc-800 pb-8">
               <div className="space-y-1">
                  <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">FinTrust Log</h2>
                  <p className="text-zinc-500 dark:text-zinc-400 font-medium text-sm">System audit of all financial records</p>
               </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[280px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder="Ask FinTrust..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-zinc-100/50 dark:bg-zinc-800/50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 focus:bg-white dark:focus:bg-zinc-800 transition-all text-zinc-900 dark:text-white placeholder-zinc-400"
                />
              </div>
              
              <div className="flex items-center gap-2">
                 <select
                   value={filterType}
                   onChange={(e) => setFilterType(e.target.value as 'all' | 'income' | 'expense')}
                   className="bg-zinc-100/50 dark:bg-zinc-800/50 px-4 py-2.5 rounded-full text-[13px] text-zinc-900 dark:text-white focus:outline-none cursor-pointer transition-colors hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50"
                 >
                   <option value="all">All Types</option>
                   <option value="income">Income</option>
                   <option value="expense">Expense</option>
                 </select>

                 <select
                   value={filterCategory}
                   onChange={(e) => setFilterCategory(e.target.value)}
                   className="bg-zinc-100/50 dark:bg-zinc-800/50 px-4 py-2.5 rounded-full text-[13px] text-zinc-900 dark:text-white focus:outline-none cursor-pointer hidden sm:block transition-colors hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50"
                 >
                   <option value="all">All Categories</option>
                   {categories.map(c => <option key={c} value={c}>{c}</option>)}
                 </select>

                 {hasFilters && (
                   <button 
                     onClick={clearFilters}
                     className="p-2.5 text-zinc-400 hover:text-zinc-900 bg-zinc-100/50 hover:bg-zinc-200/50 rounded-full transition-all"
                     title="Reset Criteria"
                   >
                     <X size={16} strokeWidth={1.5} />
                   </button>
                 )}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto overflow-y-auto max-h-[65vh] relative custom-scrollbar">
          {displayData.length === 0 ? (
            <div className="py-20"><EmptyState /></div>
          ) : (
            <table className="w-full min-w-[700px] text-left border-separate border-spacing-0">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-900 text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold border-t border-zinc-200/60 dark:border-zinc-800">
                  <th className="sticky top-0 z-20 bg-zinc-50 dark:bg-zinc-900 py-4 px-8 border-b border-zinc-200/50 group cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" onClick={() => toggleSort('description')}>
                    <div className="flex items-center gap-2">
                       Description
                      <SortHeaderIcon field="description" sortField={sortField} sortDirection={sortDirection} />
                    </div>
                  </th>
                  <th className="sticky top-0 z-20 bg-zinc-50 dark:bg-zinc-900 py-4 px-8 border-b border-zinc-200/50 group cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" onClick={() => toggleSort('category')}>
                    <div className="flex items-center gap-2">
                       Classification
                      <SortHeaderIcon field="category" sortField={sortField} sortDirection={sortDirection} />
                    </div>
                  </th>
                  <th className="sticky top-0 z-20 bg-zinc-50 dark:bg-zinc-900 py-4 px-8 border-b border-zinc-200/50 group cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors hidden sm:table-cell" onClick={() => toggleSort('date')}>
                    <div className="flex items-center gap-2">
                       Posting Date <SortHeaderIcon field="date" sortField={sortField} sortDirection={sortDirection} />
                    </div>
                  </th>
                  <th className="sticky top-0 z-20 bg-zinc-50 dark:bg-zinc-900 py-4 px-8 border-b border-zinc-200/50 group cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-right" onClick={() => toggleSort('amount')}>
                    <div className="flex items-center justify-end gap-2">
                       Net Value <SortHeaderIcon field="amount" sortField={sortField} sortDirection={sortDirection} />
                    </div>
                  </th>
                  {role === 'admin' && <th className="sticky top-0 z-20 bg-zinc-50 dark:bg-zinc-900 py-4 px-8 border-b border-zinc-200/50 text-center w-28">Actions</th>}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence initial={false}>
                  {displayData.map((tx) => {
                    const isIncome = tx.type === 'income';
                    const Icon = categoryIcons[tx.category] || categoryIcons.Other;

                    return (
                      <motion.tr 
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -10 }}
                        key={tx.id} 
                        className="group row-hover transition-all"
                      >
                        <td className="py-5 px-8 border-b border-zinc-50 dark:border-zinc-800">
                          <div className="flex items-center gap-4">
                            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                              isIncome ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-300 border border-zinc-200/40 dark:border-zinc-700 shadow-sm'
                            }`}>
                              {isIncome ? <ArrowUpRight size={18} strokeWidth={2.5} /> : <ArrowDownLeft size={18} strokeWidth={2.5} />}
                            </div>
                            <span className="font-bold text-sm tracking-tight text-zinc-900 dark:text-white font-display">{tx.description}</span>
                          </div>
                        </td>
                        <td className="py-5 px-8 border-b border-zinc-50 dark:border-zinc-800">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-zinc-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors border border-transparent group-hover:border-zinc-200 dark:group-hover:border-zinc-700">
                                 <Icon size={14} strokeWidth={2.5} />
                              </div>
                              <span className="text-[13px] font-bold text-zinc-500 uppercase tracking-widest">{tx.category}</span>
                           </div>
                        </td>
                        <td className="py-5 px-8 border-b border-zinc-50 dark:border-zinc-800 hidden sm:table-cell text-zinc-400 text-[13px] font-semibold font-numeric tracking-tight">
                          {tx.date}
                        </td>
                        <td className={`py-5 px-8 border-b border-zinc-50 dark:border-zinc-800 text-right font-bold text-sm font-numeric tracking-tighter ${
                          isIncome ? 'text-emerald-600' : 'text-zinc-900 dark:text-white text-base'
                        }`}>
                          {isIncome ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                        </td>
                        {role === 'admin' && (
                          <td className="py-5 px-8 border-b border-zinc-50 dark:border-zinc-800">
                            <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => setEditingTx(tx)} 
                                className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm transition-all"
                              >
                                <Pencil size={15} strokeWidth={2.5} />
                              </button>
                              <button 
                                onClick={() => { if (window.confirm('Delete this entry?')) deleteTransaction(tx.id); }}
                                className="p-2 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm transition-all"
                              >
                                <Trash2 size={15} strokeWidth={2.5} />
                              </button>
                            </div>
                          </td>
                        )}
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </div>
      </div>
      <AnimatePresence>
        {editingTx && (
          <TransactionModal key={editingTx.id} transaction={editingTx} onClose={() => setEditingTx(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
