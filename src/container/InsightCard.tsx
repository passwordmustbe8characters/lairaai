import React from 'react';
import { motion } from 'framer-motion';
import type { Insight } from '@/lib/mockData';

interface InsightCardProps {
  insight: Insight;
  index: number;
}

const InsightCard: React.FC<InsightCardProps> = ({ insight, index }) => {
  return (
    <motion.div
      className="laira-glass-hover p-4 flex gap-3 items-start"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <span className="text-lg flex-shrink-0 mt-0.5">{insight.icon}</span>
      <p className="text-[13px] text-foreground/80 leading-relaxed">{insight.message}</p>
    </motion.div>
  );
};

export default InsightCard;