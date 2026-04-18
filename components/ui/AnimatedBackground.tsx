'use client';

import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  primaryColor?: string;
  secondaryColor?: string;
}

export function AnimatedBackground({
  primaryColor = 'bg-primary/10',
  secondaryColor = 'bg-secondary/10',
}: AnimatedBackgroundProps) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className={`absolute top-20 right-1/3 w-96 h-96 ${secondaryColor} rounded-full blur-3xl`}
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, -30, 0] }}
        transition={{ duration: 25, repeat: Infinity, delay: 5 }}
        className={`absolute bottom-20 left-1/3 w-96 h-96 ${primaryColor} rounded-full blur-3xl`}
      />
    </div>
  );
}
