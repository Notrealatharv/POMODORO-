import { useState, useEffect, useCallback, useRef } from 'react';
import { useSettings } from '../context/SettingsContext';
import type { TimerMode } from '../types';

export const useTimer = () => {
  const { settings } = useSettings();
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(settings.workTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(() => {
    const saved = localStorage.getItem('pomodoro-sessions');
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const timerRef = useRef<any>(null);

  const switchMode = useCallback((newMode: TimerMode) => {
    setMode(newMode);
    const duration = newMode === 'work' 
      ? settings.workTime 
      : newMode === 'shortBreak' 
        ? settings.shortBreakTime 
        : settings.longBreakTime;
    setTimeLeft(duration * 60);
    setIsActive(false);
  }, [settings]);

  const handleTimerComplete = useCallback(() => {
    if (mode === 'work') {
      const nextCount = sessionsCompleted + 1;
      setSessionsCompleted(nextCount);
      localStorage.setItem('pomodoro-sessions', nextCount.toString());
      
      // Update history in local storage for stats
      const history = JSON.parse(localStorage.getItem('pomodoro-history') || '[]');
      history.push({ date: new Date().toISOString(), type: 'work' });
      localStorage.setItem('pomodoro-history', JSON.stringify(history));

      if (nextCount % settings.longBreakInterval === 0) {
        switchMode('longBreak');
      } else {
        switchMode('shortBreak');
      }
      
      if (settings.soundEnabled) {
        new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play().catch(() => {});
      }
    } else {
      switchMode('work');
      if (settings.soundEnabled) {
        new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3').play().catch(() => {});
      }
    }
  }, [mode, sessionsCompleted, settings, switchMode]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft, handleTimerComplete]);

  // Update timeLeft if settings change and timer is reset
  useEffect(() => {
    if (!isActive) {
      const duration = mode === 'work' 
        ? settings.workTime 
        : mode === 'shortBreak' 
          ? settings.shortBreakTime 
          : settings.longBreakTime;
      setTimeLeft(duration * 60);
    }
  }, [settings, mode, isActive]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    const duration = mode === 'work' 
      ? settings.workTime 
      : mode === 'shortBreak' 
        ? settings.shortBreakTime 
        : settings.longBreakTime;
    setTimeLeft(duration * 60);
  };

  const skipSession = () => {
    handleTimerComplete();
  };

  return {
    timeLeft,
    mode,
    isActive,
    sessionsCompleted,
    toggleTimer,
    resetTimer,
    skipSession,
    switchMode,
    progress: (timeLeft / ((mode === 'work' ? settings.workTime : mode === 'shortBreak' ? settings.shortBreakTime : settings.longBreakTime) * 60)) * 100
  };
};
