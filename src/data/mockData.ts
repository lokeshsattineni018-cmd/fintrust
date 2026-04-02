export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: TransactionType;
}

export const mockTransactions: Transaction[] = [
  { id: '1', date: '2024-04-01', description: 'Salary', category: 'Income', amount: 8500, type: 'income' },
  { id: '2', date: '2024-04-02', description: 'Swiggy Order', category: 'Food', amount: 450, type: 'expense' },
  { id: '3', date: '2024-04-03', description: 'Uber Trip', category: 'Travel', amount: 320, type: 'expense' },
  { id: '4', date: '2024-04-05', description: 'Electricity Bill', category: 'Bills', amount: 1500, type: 'expense' },
  { id: '5', date: '2024-04-08', description: 'Amazon Shopping', category: 'Shopping', amount: 2100, type: 'expense' },
  { id: '6', date: '2024-04-10', description: 'Freelance Project', category: 'Income', amount: 3000, type: 'income' },
  { id: '7', date: '2024-04-12', description: 'Grocery Store', category: 'Food', amount: 1200, type: 'expense' },
  { id: '8', date: '2024-04-15', description: 'Netflix Subscription', category: 'Bills', amount: 649, type: 'expense' },
  { id: '9', date: '2024-04-18', description: 'Flights to Goa', category: 'Travel', amount: 7500, type: 'expense' },
  { id: '10', date: '2024-04-20', description: 'Starbucks Coffee', category: 'Food', amount: 480, type: 'expense' },
  { id: '11', date: '2024-04-22', description: 'Zomato Pro', category: 'Food', amount: 200, type: 'expense' },
  { id: '12', date: '2024-04-25', description: 'Internet Bill', category: 'Bills', amount: 999, type: 'expense' },
  { id: '13', date: '2024-04-27', description: 'Dividend Income', category: 'Income', amount: 150, type: 'income' },
  { id: '14', date: '2024-04-28', description: 'Myntra Sale', category: 'Shopping', amount: 3500, type: 'expense' },
  { id: '15', date: '2024-04-30', description: 'Gym Membership', category: 'Bills', amount: 2500, type: 'expense' },
];

// Helper to pre-calculate chart data initially based on mockTransactions
export const getBalanceTrend = (transactions: Transaction[]) => {
  void transactions;
  // Mock monthly trend mapping. In a real app this would compute from a long history
  return [
    { name: 'Jan', balance: 28000 },
    { name: 'Feb', balance: 35000 },
    { name: 'Mar', balance: 33000 },
    { name: 'Apr', balance: 39500 },
    { name: 'May', balance: 45200 },
  ];
};

export const getCategorySpend = (transactions: Transaction[]) => {
  const categories: Record<string, number> = {};
  transactions.filter(t => t.type === 'expense').forEach(t => {
    categories[t.category] = (categories[t.category] || 0) + t.amount;
  });
  
  return Object.entries(categories).map(([name, value]) => ({ name, value }));
};

export const getIncomeVsExpense = (transactions: Transaction[]) => {
  void transactions;
  // Mock monthly Income/Expense. In real app compute per month
  return [
    { name: 'Jan', income: 8500, expense: 6200 },
    { name: 'Feb', income: 9000, expense: 7100 },
    { name: 'Mar', income: 8500, expense: 5800 },
    { name: 'Apr', income: 11650, expense: 6500 }, // Matches mock data roughly
  ];
};
