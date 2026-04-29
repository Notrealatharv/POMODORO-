// # create a mode switcher for work sessions and break intervals
import React from 'react';
import type { TimerMode } from '../types';

interface ModeSwitcherProps {
  currentMode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
}

export const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ currentMode, onModeChange }) => {
  return (
    <div className="mode-switcher">
      <button 
        className={`mode-btn ${currentMode === 'work' ? 'active' : ''}`}
        onClick={() => onModeChange('work')}
      >
        Work
      </button>
      <button 
        className={`mode-btn ${currentMode === 'shortBreak' ? 'active' : ''}`}
        onClick={() => onModeChange('shortBreak')}
      >
        Short Break
      </button>
      <button 
        className={`mode-btn ${currentMode === 'longBreak' ? 'active' : ''}`}
        onClick={() => onModeChange('longBreak')}
      >
        Long Break
      </button>
    </div>
  );
};
