# The Ledger — Finance Dashboard

A modern personal finance dashboard built with React, TypeScript, and Vite. Track your income, expenses, and spending patterns with interactive charts, smart insights, and a clean minimal interface.

## ✨ Features

### Dashboard Overview
- **Summary Cards** — Total Balance, Monthly Income, and Monthly Expenses with percentage change indicators
- **Balance Trend Chart** — Area chart showing balance trend over time (Recharts)
- **Spending Categories** — Interactive donut chart breaking down expenses by category
- **Income vs Expenses** — Monthly bar chart comparing income and expense flows

### Transactions Management
- **Full Transaction List** — View all transactions with date, amount, category, and type
- **Search** — Real-time search across description, category, and amount
- **Filters** — Filter by type (income/expense) and category (Food, Travel, Bills, etc.)
- **Sortable Columns** — Click column headers (Date, Amount) to sort ascending/descending
- **Add Transaction** — Modal form to add new transactions (Admin only)
- **Edit Transaction** — Edit existing transactions via pre-filled modal (Admin only)
- **Delete Transaction** — Delete with inline confirmation (Admin only)
- **Pagination** — Shows 8 transactions with "View All" expansion

### Smart Insights
- **Highest Spending Category** — Identifies your top expense category with percentage
- **Budget Usage** — Alerts when expenses exceed 80% of income
- **Savings Rate** — Calculates your savings percentage with contextual advice
- **Net Flow** — Shows total transaction count and net cash flow

### Role-Based UI (RBAC)
- **Admin** — Can add, edit, and delete transactions; sees all action buttons
- **Viewer** — Read-only view; add/edit/delete controls are hidden
- Toggle between roles using the header toggle (desktop) or mobile controls

### Data Persistence
- Transactions are automatically saved to `localStorage`
- Data survives page refreshes and browser restarts
- Graceful fallback to mock data if storage is corrupted

### Export
- **CSV Export** — Download all transactions as a CSV file with one click

### Empty States
- Graceful handling when no transactions match filters
- Contextual empty state messages throughout the app

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **TypeScript** | Type safety |
| **Vite** | Build tool & dev server |
| **Tailwind CSS 3** | Utility-first styling |
| **Recharts** | Charts & data visualization |
| **Lucide React** | Icon library |
| **React Context** | State management |

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd "Finance Dashboard UI"

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── charts/
│   │   ├── BalanceTrendChart.tsx    # Area chart for balance trend
│   │   ├── CategorySpendChart.tsx   # Donut chart for spending categories
│   │   └── IncomeExpenseChart.tsx   # Bar chart for income vs expenses
│   ├── dashboard/
│   │   ├── ChartsSection.tsx        # Charts layout wrapper
│   │   ├── InsightsPanel.tsx        # Dynamic insights computed from data
│   │   └── SummaryCards.tsx         # Balance, income, expense cards
│   ├── layout/
│   │   ├── AppLayout.tsx            # Main layout with sidebar + content
│   │   ├── BottomNav.tsx            # Mobile bottom navigation
│   │   ├── Header.tsx               # Top header with search + role toggle
│   │   └── Sidebar.tsx              # Desktop sidebar navigation
│   ├── shared/
│   │   └── EmptyState.tsx           # Reusable empty state component
│   └── transactions/
│       ├── TransactionModal.tsx      # Add/Edit transaction modal
│       └── TransactionsTable.tsx     # Transaction list with search/filter/sort
├── context/
│   └── DashboardContext.tsx          # Central state management
├── data/
│   └── mockData.ts                  # Mock transactions and chart data helpers
├── lib/
│   └── utils.ts                     # Utility functions (cn)
├── pages/
│   └── Dashboard.tsx                # Main dashboard page
├── App.tsx                          # App root with provider
├── main.tsx                         # Entry point
└── index.css                        # Global styles and Tailwind imports
```

---

## 🏗 Architecture Decisions

### State Management — React Context
All application state is centralized in `DashboardContext`:
- **Transaction CRUD** — add, edit, delete operations
- **Filters & Search** — search query, type filter, category filter
- **Sort** — field and direction
- **Role** — admin/viewer toggle
- **UI State** — sidebar open/close

This approach avoids prop drilling while keeping the bundle small (no external state library needed for this scale).

### Data Persistence — localStorage
Transactions are automatically synced to `localStorage` on every mutation via a `useEffect` hook. On load, the app attempts to read from storage and falls back to mock data if parsing fails.

### Role-Based Access Control
RBAC is simulated on the frontend via a `role` state variable. Components conditionally render edit/delete buttons and the "Add Transaction" action based on the current role. This demonstrates the pattern without requiring backend authentication.

### Responsive Design
- **Desktop** (≥1024px): Sidebar navigation, wide data table, 3-column grid layouts
- **Mobile** (<1024px): Bottom navigation bar, stacked card layouts, bottom-sheet modal
- All breakpoints handled via Tailwind responsive utilities

---

## 📊 Evaluation Criteria Coverage

| Criteria | Implementation |
|---|---|
| **Design & Creativity** | Light minimal palette (soft indigo/emerald), rounded cards, smooth hover states, clean typography |
| **Responsiveness** | Fully responsive with distinct mobile and desktop layouts |
| **Functionality** | Dashboard, transactions CRUD, charts, filters, search, sort, export |
| **User Experience** | Inline confirmations, filter chips, empty states, smooth transitions |
| **Technical Quality** | TypeScript strict mode, component modularity, custom hooks, memoized computations |
| **State Management** | React Context with centralized CRUD, filters, persistence |
| **Documentation** | This README with architecture decisions, setup, and structure |
| **Attention to Detail** | Empty states, localStorage fallback, truncated IDs, filter badge counts |
