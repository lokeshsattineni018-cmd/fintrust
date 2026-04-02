import { DashboardProvider, useDashboard } from './context/DashboardContext';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { ActivityPage } from './pages/ActivityPage';
import { InsightsPage } from './pages/InsightsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { pageTransition } from './lib/motion';

const pageTransitionReduced = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.18 } },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};

function PageRouter() {
  const { activePage } = useDashboard();
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion ? pageTransitionReduced : pageTransition;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activePage}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full h-full"
      >
        {activePage === 'dashboard' && <Dashboard />}
        {activePage === 'activity' && <ActivityPage />}
        {activePage === 'insights' && <InsightsPage />}
        {activePage === 'settings' && <SettingsPage />}
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <DashboardProvider>
      <AppLayout>
        <PageRouter />
      </AppLayout>
    </DashboardProvider>
  );
}

export default App;
