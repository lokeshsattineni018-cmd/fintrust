import { LayoutDashboard, Receipt, Lightbulb, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDashboard, type Page } from '../../context/DashboardContext';

const navItems: { page: Page; icon: React.ElementType; label: string }[] = [
  { page: 'dashboard', icon: LayoutDashboard, label: 'Home' },
  { page: 'activity', icon: Receipt, label: 'Activity' },
  { page: 'insights', icon: Lightbulb, label: 'Insights' },
  { page: 'settings', icon: Settings, label: 'Settings' },
];

export function BottomNav() {
  const { activePage, setActivePage } = useDashboard();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-[76px] items-start justify-around border-t border-zinc-200/80 bg-white/85 px-2 pt-2 backdrop-blur-2xl pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_40px_-12px_rgba(0,0,0,0.12)] md:hidden">
      {navItems.map(({ page, icon: Icon, label }) => {
        const isActive = activePage === page;
        return (
          <button
            key={page}
            type="button"
            onClick={() => setActivePage(page)}
            className={`relative flex min-w-[4rem] flex-col items-center gap-1 rounded-2xl px-3 py-2 transition-colors ${
              isActive ? 'text-emerald-700' : 'text-zinc-400 hover:text-zinc-600'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="bottom-tab"
                className="absolute inset-0 rounded-2xl bg-gradient-to-b from-emerald-50 to-teal-50/80 shadow-inner ring-1 ring-emerald-200/60"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
            <span className="relative z-10">
              <Icon size={21} strokeWidth={isActive ? 2.25 : 2} />
            </span>
            <span className={`relative z-10 text-[10px] font-medium tracking-tight ${isActive ? 'font-semibold' : ''}`}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
