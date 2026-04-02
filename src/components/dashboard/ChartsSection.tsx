import { motion } from 'framer-motion';
import { BalanceTrendChart } from '../charts/BalanceTrendChart';
import { CategorySpendChart } from '../charts/CategorySpendChart';
import { IncomeExpenseChart } from '../charts/IncomeExpenseChart';
import { staggerContainer, staggerItem, viewportOnce } from '../../lib/motion';

export function ChartsSection() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="space-y-6 lg:space-y-8"
    >
      <motion.section
        variants={staggerItem}
        className="mt-2 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8"
      >
        <div className="lg:col-span-2 w-full h-full">
          <BalanceTrendChart />
        </div>
        <div className="w-full h-full flex flex-col">
          <CategorySpendChart />
        </div>
      </motion.section>

      <motion.div variants={staggerItem}>
        <IncomeExpenseChart />
      </motion.div>
    </motion.div>
  );
}
