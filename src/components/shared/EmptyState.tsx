import type { ElementType } from 'react';
import { Inbox } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  icon?: ElementType;
  title?: string;
  description?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title = 'No data available',
  description = 'Add some transactions or change your filters to see your financial activity.',
}: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className="relative group mb-8">
        <div className="absolute inset-0 bg-emerald-500/10 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="w-20 h-20 rounded-3xl bg-white border border-zinc-100 shadow-xl shadow-zinc-900/5 flex items-center justify-center relative z-10">
          <Icon size={32} className="text-zinc-400" strokeWidth={1.5} />
        </div>
      </div>
      <h4 className="font-display font-bold text-zinc-900 text-lg mb-2">{title}</h4>
      <p className="text-sm font-medium text-zinc-500 max-w-[280px] leading-relaxed mx-auto italic">
        {description}
      </p>
      
      <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-zinc-900/5 rounded-full border border-zinc-900/5">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">System Monitoring Active</span>
      </div>
    </motion.div>
  );
}
