import { Search, Bell, Menu, Moon, Sun } from 'lucide-react';
import { useDashboard, type Page } from '../../context/DashboardContext';

const pageTitles: Record<Page, string> = {
  dashboard: 'Overview',
  activity: 'Activity',
  insights: 'Insights',
  settings: 'Settings',
};

export function Header() {
  const { role, setRole, setIsSidebarOpen, activePage, darkMode, setDarkMode } = useDashboard();

  const roleToggle = (
    <div className="flex items-center gap-1 bg-zinc-100/50 dark:bg-zinc-800/50 backdrop-blur-3xl rounded-full p-1">
      <button
        type="button"
        onClick={() => setRole('admin')}
        className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
          role === 'admin'
            ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm'
            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
        }`}
      >
        Admin
      </button>
      <button
        type="button"
        onClick={() => setRole('viewer')}
        className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
          role === 'viewer'
            ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm'
            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
        }`}
      >
        View
      </button>
    </div>
  );

  const avatar = (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-600 dark:text-zinc-300 transition-transform">
      LS
    </div>
  );

  return (
    <header className="sticky top-0 z-40 bg-zinc-50/80 dark:bg-[#050505]/80 backdrop-blur-3xl border-b border-zinc-200/50 dark:border-zinc-800/50 transition-colors">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-4">
        <div className="flex lg:hidden items-center justify-between mb-4">
          <button onClick={() => setIsSidebarOpen(true)} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
            <Menu size={24} strokeWidth={1.5} />
          </button>
          <span className="font-display text-lg font-bold tracking-tight text-zinc-900 dark:text-white">{pageTitles[activePage]}</span>
          <div className="flex items-center gap-3">
            <button onClick={() => setDarkMode(!darkMode)} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
              {darkMode ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
            </button>
            {avatar}
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-between gap-10">
          <div className="flex min-w-0 items-center gap-3">
            <span className="font-display text-xl font-bold tracking-tight text-zinc-900 dark:text-white">{pageTitles[activePage]}</span>
          </div>

          <div className="relative flex-1 max-w-sm group">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors"
              strokeWidth={1.5}
            />
            <input
              type="text"
              placeholder="Search..."
              className="h-9 w-full rounded-full bg-zinc-200/50 dark:bg-zinc-800/50 pl-9 pr-4 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-500 transition-all focus:bg-white dark:focus:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 font-medium"
            />
          </div>

          <div className="flex items-center justify-end gap-6 text-sm">
            {roleToggle}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                {darkMode ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
              </button>
              <button
                type="button"
                className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <Bell size={20} strokeWidth={1.5} />
              </button>
              {avatar}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
