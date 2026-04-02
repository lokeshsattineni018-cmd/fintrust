import { Search, Bell, Menu } from 'lucide-react';
import { useDashboard, type Page } from '../../context/DashboardContext';

const pageTitles: Record<Page, string> = {
  dashboard: 'Overview',
  activity: 'Activity',
  insights: 'Insights',
  settings: 'Settings',
};

export function Header() {
  const { role, setRole, setIsSidebarOpen, activePage } = useDashboard();

  const roleToggle = (
    <div className="flex items-center gap-1 bg-zinc-100/50 backdrop-blur-3xl rounded-full p-1">
      <button
        type="button"
        onClick={() => setRole('admin')}
        className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
          role === 'admin'
            ? 'bg-white text-zinc-900 shadow-sm'
            : 'text-zinc-500 hover:text-zinc-800'
        }`}
      >
        Admin
      </button>
      <button
        type="button"
        onClick={() => setRole('viewer')}
        className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
          role === 'viewer'
            ? 'bg-white text-zinc-900 shadow-sm'
            : 'text-zinc-500 hover:text-zinc-800'
        }`}
      >
        View
      </button>
    </div>
  );

  const avatar = (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-[10px] font-bold text-zinc-600 transition-transform">
      AS
    </div>
  );

  return (
    <header className="sticky top-0 z-40 bg-[rgba(245,245,247,0.7)] backdrop-blur-3xl backdrop-saturate-150 border-b border-zinc-200/40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-4">
        <div className="flex lg:hidden items-center justify-between mb-4">
          <button onClick={() => setIsSidebarOpen(true)} className="text-zinc-500 hover:text-zinc-900">
            <Menu size={24} strokeWidth={1.5} />
          </button>
          <span className="font-display text-lg font-bold tracking-tight text-zinc-900">{pageTitles[activePage]}</span>
          {avatar}
        </div>

        <div className="hidden lg:flex items-center justify-between gap-10">
          <div className="flex min-w-0 items-center gap-3">
            <span className="font-display text-xl font-bold tracking-tight text-zinc-900">{pageTitles[activePage]}</span>
          </div>

          <div className="relative flex-1 max-w-sm group">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 transition-colors"
              strokeWidth={1.5}
            />
            <input
              type="text"
              placeholder="Search..."
              className="h-9 w-full rounded-full bg-zinc-200/50 pl-9 pr-4 text-sm text-zinc-900 placeholder:text-zinc-500 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 font-medium"
            />
          </div>

          <div className="flex items-center justify-end gap-6 text-sm">
            {roleToggle}
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="text-zinc-500 hover:text-zinc-900 transition-colors"
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
