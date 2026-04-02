import {
  LayoutDashboard,
  Receipt,
  Lightbulb,
  Settings,
  LogOut,
  HelpCircle,
  Plus,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useDashboard, type Page } from '../../context/DashboardContext';

const mainNav: { page: Page; icon: React.ElementType; label: string }[] = [
  { page: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
  { page: 'activity', icon: Receipt, label: 'Activity' },
  { page: 'insights', icon: Lightbulb, label: 'Insights' },
  { page: 'settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const { role, activePage, setActivePage, isSidebarOpen, setIsSidebarOpen } = useDashboard();

  const navigate = (page: Page) => {
    setActivePage(page);
    setIsSidebarOpen(false);
  };

  return (
    <>
      {isSidebarOpen && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="lg:hidden fixed inset-0 z-40 bg-zinc-900/10 dark:bg-black/30 backdrop-blur-sm"
           onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-[100dvh] w-[260px] flex-col border-r border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/80 dark:bg-[#050505]/80 backdrop-blur-3xl transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="relative px-6 py-6 mt-2">
          <div className="flex items-center gap-3 mt-2">
            <div className="w-9 h-9 bg-zinc-900 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-zinc-900 shadow-xl shadow-zinc-900/20">
               <ArrowUpRight size={22} strokeWidth={3} />
            </div>
            <div className="min-w-0">
               <p className="font-display text-[20px] font-bold tracking-tight text-zinc-900 dark:text-white">FinTrust</p>
            </div>
          </div>
        </div>


        <nav className="relative flex-1 space-y-1 overflow-y-auto px-4 mt-8">
          <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Main Menu</p>
          {mainNav.map(({ page, icon: Icon, label }) => {
            const isActive = activePage === page;
            return (
              <button
                key={page}
                type="button"
                onClick={() => navigate(page)}
                className={`group relative flex w-full items-center gap-3.5 rounded-full py-2.5 px-3.5 text-left text-[14px] transition-all duration-300 ${
                  isActive
                    ? 'bg-zinc-200/60 dark:bg-zinc-800/60 font-semibold text-zinc-900 dark:text-white'
                    : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200/30 dark:hover:bg-zinc-800/30 hover:text-zinc-900 dark:hover:text-white font-medium'
                }`}
              >
                <Icon size={18} strokeWidth={1.5} className={isActive ? "text-zinc-900 dark:text-white" : "text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"} />
                <span className="tracking-tight">{label}</span>
              </button>
            );
          })}
        </nav>

        <div className="relative mt-auto px-4 py-6 space-y-6">
          {role === 'admin' && (
            <button
              onClick={() => navigate('activity')}
              className="flex w-full items-center justify-center gap-2.5 rounded-full bg-zinc-900 dark:bg-white py-3.5 text-[13px] font-medium text-white dark:text-zinc-900 shadow-sm transition-all hover:bg-zinc-800 dark:hover:bg-zinc-100"
            >
              <Plus size={16} strokeWidth={2} />
              New Entry
            </button>
          )}

          <div className="space-y-1">
            <button
              type="button"
              className="flex w-full items-center gap-3.5 rounded-full px-4 py-2.5 text-[13px] font-medium text-zinc-500 dark:text-zinc-400 transition-all hover:bg-zinc-200/40 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-white"
            >
              <HelpCircle size={18} strokeWidth={1.5} />
              Help Center
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-3.5 rounded-full px-4 py-2.5 text-[13px] font-medium text-zinc-500 dark:text-zinc-400 transition-all hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500"
            >
              <LogOut size={18} strokeWidth={1.5} />
              Sign Out
            </button>
          </div>
          
          <div className="mt-8 flex items-center justify-between px-4">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-200/60 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-600 dark:text-zinc-300">LS</div>
                <p className="text-sm text-zinc-900 dark:text-white tracking-[-0.02em] truncate" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>Lokesh Sattineni</p>
             </div>
          </div>
        </div>
      </aside>
    </>
  );
}
