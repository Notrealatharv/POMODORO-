// # create a visual progress ring that tracks time remaining
import React from 'react';
import { motion } from 'framer-motion';

interface ProgressRingProps {
  progress: number;
  color: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({ progress, color }) => {
  const radius = 145;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="timer-display">
      <svg className="progress-ring-container" width="320" height="320">
        <circle
          cx="160"
          cy="160"
          r={radius}
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="10"
          fill="transparent"
        />
        <motion.circle
          cx="160"
          cy="160"
          r={radius}
          stroke={color}
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, ease: "linear" }}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
