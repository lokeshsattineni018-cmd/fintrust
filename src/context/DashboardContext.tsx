import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { type Transaction, mockTransactions } from '../data/mockData';

type Role = 'viewer' | 'admin';
type SortField = 'date' | 'amount' | 'description' | 'category';
type SortDirection = 'asc' | 'desc';
export type Page = 'dashboard' | 'activity' | 'insights' | 'settings';

interface DashboardContextType {
  role: Role;
  setRole: (role: Role) => void;
  activePage: Page;
  setActivePage: (page: Page) => void;
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  editTransaction: (id: string, tx: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filterType: 'all' | 'income' | 'expense';
  setFilterType: (t: 'all' | 'income' | 'expense') => void;
  filterCategory: string;
  setFilterCategory: (c: string) => void;
  sortField: SortField;
  setSortField: (f: SortField) => void;
  sortDirection: SortDirection;
  setSortDirection: (d: SortDirection) => void;
  toggleSort: (field: SortField) => void;
}

const STORAGE_KEY = 'finance_dashboard_transactions';

function loadTransactions(): Transaction[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // Corrupted data — fall back to mock
  }
  return mockTransactions;
}

function saveTransactions(transactions: Transaction[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch {
    // Storage full — silently fail
  }
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('admin');
  const [transactions, setTransactions] = useState<Transaction[]>(loadTransactions);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Persist to localStorage on every change
  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  const addTransaction = useCallback((tx: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...tx,
      id: Date.now().toString(36) + Math.random().toString(36).substring(2, 7),
    };
    setTransactions(prev => [newTx, ...prev]);
  }, []);

  const editTransaction = useCallback((id: string, tx: Omit<Transaction, 'id'>) => {
    setTransactions(prev =>
      prev.map(t => (t.id === id ? { ...tx, id } : t))
    );
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  const toggleSort = useCallback((field: SortField) => {
    setSortField(prev => {
      if (prev === field) {
        setSortDirection(d => (d === 'asc' ? 'desc' : 'asc'));
        return field;
      }
      setSortDirection('desc');
      return field;
    });
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        role, setRole,
        activePage, setActivePage,
        transactions, addTransaction, editTransaction, deleteTransaction,
        isSidebarOpen, setIsSidebarOpen,
        searchQuery, setSearchQuery,
        filterType, setFilterType,
        filterCategory, setFilterCategory,
        sortField, setSortField,
        sortDirection, setSortDirection,
        toggleSort,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

/* eslint-disable react-refresh/only-export-components -- hook paired with provider */
export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
}
