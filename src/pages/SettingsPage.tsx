import { motion } from 'framer-motion';
import { User, Shield } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { fadeUp, staggerContainer, staggerItem } from '../lib/motion';

export function SettingsPage() {
  const { role, setRole } = useDashboard();

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="space-y-12 mt-2 max-w-5xl pb-32"
    >
      <motion.div variants={fadeUp}>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 font-display leading-none">Settings.</h1>
          <p className="text-zinc-500 mt-2 text-base font-medium max-w-xl">
            Manage your operational identity and system authorization.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Card */}
        <motion.div variants={staggerItem} className="glass-card squircle-32 p-8 flex flex-col justify-between group">
           <div className="flex items-center justify-between mb-8">
              <div className="w-16 h-16 bg-zinc-50 rounded-3xl flex items-center justify-center border border-zinc-200/50 shadow-sm flex-shrink-0 group-hover:bg-zinc-100 transition-colors">
                <User size={24} className="text-zinc-400" strokeWidth={2} />
              </div>
           </div>
           <div className="space-y-2">
             <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em] leading-none mb-4">Primary Account</p>
             <h2 className="text-4xl text-zinc-900 tracking-tighter leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400 }}>Alex Sattineni</h2>
             <p className="text-sm text-zinc-500 mt-2 tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300 }}>alex@fintrust.io</p>
           </div>
        </motion.div>

        {/* Security & Role Card */}
        <motion.div variants={staggerItem} className="glass-card squircle-32 p-8 flex flex-col justify-between group">
           <div className="flex items-center justify-between mb-8">
              <div className="w-16 h-16 bg-zinc-900 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-zinc-900/20 group-hover:scale-105 transition-transform flex-shrink-0">
                 <Shield size={24} strokeWidth={2} />
              </div>
              <button
                onClick={() => setRole(role === 'admin' ? 'viewer' : 'admin')}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-4 focus:ring-zinc-900/10 ${
                  role === 'admin' ? 'bg-zinc-900' : 'bg-zinc-200'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 shadow-md ${
                    role === 'admin' ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
           </div>
           
           <div className="space-y-2">
              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest leading-none">System Protocol</p>
              <h2 className="text-2xl font-bold text-zinc-900 font-display tracking-tight leading-none">Authorization</h2>
              <p className="text-sm font-semibold text-zinc-500 mt-1">
                 {role === 'admin' ? 'Administrative Privileges Active' : 'Standard Viewer Mode'}
              </p>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
