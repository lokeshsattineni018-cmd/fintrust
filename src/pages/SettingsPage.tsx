import { motion } from 'framer-motion';
import { User, Shield, Moon, Sun } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { fadeUp, staggerContainer, staggerItem } from '../lib/motion';

export function SettingsPage() {
  const { role, setRole, darkMode, setDarkMode } = useDashboard();

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="space-y-12 mt-2 max-w-5xl pb-32"
    >
      <motion.div variants={fadeUp}>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white font-display leading-none">Settings.</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-base font-medium max-w-xl">
            Manage your operational identity and system authorization.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div variants={staggerItem} className="glass-card squircle-32 p-8 flex flex-col justify-between group">
           <div className="flex items-center justify-between mb-8">
              <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-800 rounded-3xl flex items-center justify-center border border-zinc-200/50 dark:border-zinc-700/50 shadow-sm flex-shrink-0 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-700 transition-colors">
                <User size={24} className="text-zinc-400 dark:text-zinc-300" strokeWidth={2} />
              </div>
           </div>
           <div className="space-y-2">
             <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em] leading-none mb-4">Primary Account</p>
             <h2 className="text-4xl text-zinc-900 dark:text-white tracking-tighter leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400 }}>Lokesh Sattineni</h2>
             <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300 }}>lokesh@fintrust.io</p>
           </div>
        </motion.div>

        {/* Security & Role Card */}
        <motion.div variants={staggerItem} className="glass-card squircle-32 p-8 flex flex-col justify-between group">
           <div className="flex items-center justify-between mb-8">
              <div className="w-16 h-16 bg-zinc-900 dark:bg-white rounded-3xl flex items-center justify-center text-white dark:text-zinc-900 shadow-xl shadow-zinc-900/20 dark:shadow-white/10 group-hover:scale-105 transition-transform flex-shrink-0">
                 <Shield size={24} strokeWidth={2} />
              </div>
              <button
                onClick={() => setRole(role === 'admin' ? 'viewer' : 'admin')}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-4 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 ${
                  role === 'admin' ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-700'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white dark:bg-zinc-900 transition-transform duration-300 shadow-md ${
                    role === 'admin' ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
           </div>
           
           <div className="space-y-2">
              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest leading-none">System Protocol</p>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white font-display tracking-tight leading-none">Authorization</h2>
              <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mt-1">
                 {role === 'admin' ? 'Administrative Privileges Active' : 'Standard Viewer Mode'}
              </p>
           </div>
        </motion.div>

        {/* Dark Mode Card */}
        <motion.div variants={staggerItem} className="glass-card squircle-32 p-8 flex flex-col justify-between group">
           <div className="flex items-center justify-between mb-8">
              <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform flex-shrink-0 ${
                darkMode
                  ? 'bg-indigo-500 text-white shadow-indigo-500/20'
                  : 'bg-amber-400 text-white shadow-amber-400/20'
              }`}>
                 {darkMode ? <Moon size={24} strokeWidth={2} /> : <Sun size={24} strokeWidth={2} />}
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-4 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 ${
                  darkMode ? 'bg-indigo-500' : 'bg-zinc-200 dark:bg-zinc-700'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 shadow-md ${
                    darkMode ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
           </div>
           
           <div className="space-y-2">
              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest leading-none">Appearance</p>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white font-display tracking-tight leading-none">Dark Mode</h2>
              <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mt-1">
                 {darkMode ? 'Dark Theme Active' : 'Light Theme Active'}
              </p>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
