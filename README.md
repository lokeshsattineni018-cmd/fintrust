# FinTrust — Personal Finance Dashboard

A premium, Apple-inspired personal finance dashboard built with React, TypeScript, and Vite. Designed with Figma-level visual precision featuring glassmorphism, fluid micro-animations, and a minimal aesthetic.

> Built as an internship project to demonstrate frontend engineering, UI/UX design systems, and modern web architecture.

---

## 🖼 Preview

| Overview | Activity | Insights | Settings |
|----------|----------|----------|----------|
| Summary cards, charts, and spending insights | Transaction log with search, filter & sort | Progress rings, sector allocation & category chart | Profile card & authorization toggle |

---

## ✨ Key Features

### 📊 Dashboard Overview
- **Summary Cards** — Total Balance, Monthly Income & Expenses with trend indicators
- **Balance Trend Chart** — Animated area chart tracking balance over time
- **Category Spend Chart** — Visual breakdown of spending by category
- **Income vs Expenses** — Monthly bar chart comparison

### 📋 Activity & Transactions
- **Searchable Transaction Table** — Real-time search across all fields
- **Filter & Sort** — Filter by type/category, sort by date or amount
- **Add / Edit / Delete** — Full CRUD operations (Admin role only)
- **CSV Export** — One-click download of the complete financial dataset
- **Internal Scrolling** — Sticky headers with contained scroll for large datasets

### 🧠 Insights Engine
- **Progress Rings** — Animated circular indicators for savings rate, capital usage, inflow ratio, and sector focus
- **Sector Allocation** — Weighted expenditure breakdown with animated progress bars
- **Category Spend Chart** — Visual chart of spending distribution

### ⚙️ Settings
- **Profile Card** — User identity display with Space Grotesk typography
- **Authorization Toggle** — Switch between Admin and Viewer roles

### 🔐 Role-Based Access (RBAC)
- **Admin** — Full access: add, edit, delete transactions
- **Viewer** — Read-only: all mutation controls are hidden
- Toggle between roles via the Settings page or header controls

### 💾 Data Persistence
- Transactions auto-save to `localStorage`
- Survives page refreshes and browser restarts
- Graceful fallback to mock data if storage is corrupted

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| **Primary Font** | Inter (body), Outfit (headings) |
| **Display Font** | Space Grotesk (names, identity) |
| **Mono Font** | JetBrains Mono (numbers, amounts) |
| **Background** | Apple Gray `#f5f5f7` |
| **Surface** | Pure White with subtle borders |
| **Border Radius** | 24px / 32px (squircle style) |
| **Shadows** | Multi-layered natural shadows |
| **Glass Effects** | `backdrop-blur` with saturated overlays |
| **Animations** | Framer Motion with spring physics |

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **TypeScript** | Type safety |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **Recharts** | Charts & data visualization |
| **Lucide React** | Icon system |
| **React Context** | Centralized state management |

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/lokeshsattineni018-cmd/fintrust.git
cd fintrust

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
│   │   ├── BalanceTrendChart.tsx       # Animated area chart
│   │   ├── CategorySpendChart.tsx      # Category donut/bar chart
│   │   └── IncomeExpenseChart.tsx      # Income vs expense bar chart
│   ├── dashboard/
│   │   ├── ChartsSection.tsx           # Charts grid layout
│   │   ├── InsightsPanel.tsx           # AI-style insights cards
│   │   └── SummaryCards.tsx            # Balance, income, expense cards
│   ├── layout/
│   │   ├── AmbientBackground.tsx       # Subtle animated background
│   │   ├── AppLayout.tsx               # Main layout (sidebar + content)
│   │   ├── BottomNav.tsx               # Mobile bottom navigation
│   │   ├── Header.tsx                  # Top header with search & controls
│   │   └── Sidebar.tsx                 # Desktop sidebar with glassmorphism
│   ├── shared/
│   │   └── EmptyState.tsx              # Reusable empty state component
│   └── transactions/
│       ├── TransactionModal.tsx         # Add/Edit transaction modal
│       └── TransactionsTable.tsx        # Full-featured data table
├── context/
│   └── DashboardContext.tsx             # Centralized state (CRUD, filters, role)
├── data/
│   └── mockData.ts                     # Sample transaction data
├── lib/
│   ├── motion.ts                       # Framer Motion animation presets
│   └── utils.ts                        # Utility functions
├── pages/
│   ├── Dashboard.tsx                   # Overview page
│   ├── ActivityPage.tsx                # Transaction journal
│   ├── InsightsPage.tsx                # Analytics & predictions
│   └── SettingsPage.tsx                # Profile & authorization
├── index.css                           # Design system tokens & global styles
├── App.tsx                             # Root component
└── main.tsx                            # Entry point
```

---

## 🏗 Architecture Decisions

### State Management — React Context
All state is centralized in `DashboardContext`: transaction CRUD, search, filters, sort, role toggle, and sidebar state. This avoids prop drilling while keeping the bundle lean.

### Design Philosophy — "Less is More"
Inspired by Apple's design language: generous whitespace, subtle shadows, restrained color palette, and typography-driven hierarchy. Every element serves a purpose.

### Responsive Strategy
- **Desktop (≥1024px):** Sidebar navigation, wide data tables, multi-column grids
- **Mobile (<1024px):** Bottom navigation bar, stacked cards, full-width layouts
- All breakpoints handled via Tailwind responsive utilities

### Performance
- `useMemo` for expensive computations (stats, filtering, sorting)
- `useCallback` for stable function references
- Internal scrolling containers to prevent layout thrashing
- Optimized Framer Motion with `will-change` hints

---

## 📊 Evaluation Criteria Coverage

| Criteria | Implementation |
|---|---|
| **Design & Creativity** | Apple-grade glassmorphism, Space Grotesk typography, squircle corners, multi-layered shadows |
| **Responsiveness** | Fully responsive with distinct mobile/desktop layouts and navigation |
| **Functionality** | Dashboard, transactions CRUD, charts, filters, search, sort, CSV export |
| **User Experience** | Micro-animations, hover states, empty states, smooth page transitions |
| **Technical Quality** | TypeScript strict mode, component modularity, memoized computations |
| **State Management** | React Context with centralized CRUD, filters, localStorage persistence |
| **Code Quality** | Zero lint errors, zero type errors, clean production build |
| **Documentation** | This README with architecture decisions, setup instructions, and project structure |

---

## 📄 License

This project was built as an internship submission. Feel free to reference for learning purposes.

---

<p align="center">
  <strong>FinTrust</strong> — Designed with precision.
</p>
