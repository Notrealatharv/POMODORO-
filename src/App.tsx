// # create the main pomodoro plus application with timer, tasks, and statistics
import React from 'react';
import { SettingsProvider } from './context/SettingsContext';
import { useTimer } from './hooks/useTimer';
import { ProgressRing } from './components/ProgressRing';
import { Controls } from './components/Controls';
import { ModeSwitcher } from './components/ModeSwitcher';
import { Stats } from './components/Stats';
import { Settings } from './components/Settings';
import { TaskList } from './components/TaskList';
import { QuoteDisplay } from './components/QuoteDisplay';
import { CheckCircle2, Layout as LayoutIcon } from 'lucide-react';
import './App.css';

const AppContent: React.FC = () => {
  const { 
    timeLeft, 
    mode, 
    isActive, 
    sessionsCompleted, 
    toggleTimer, 
    resetTimer, 
    skipSession, 
    switchMode,
    progress 
  } = useTimer();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentModeColor = mode === 'work' 
    ? 'var(--accent-work)' 
    : mode === 'shortBreak' 
      ? 'var(--accent-break)' 
      : 'var(--accent-long-break)';

  return (
    <div className="container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.025em', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '10px' }}>
            <LayoutIcon size={20} color="white" />
          </div>
          Pomodoro<span style={{ color: 'var(--primary)' }}>+</span>
        </h1>
        <div className="glass-panel" style={{ padding: '8px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={18} className="text-primary" />
          <span style={{ fontWeight: 600 }}>{sessionsCompleted} Cycles</span>
        </div>
      </header>

      <main className="main-layout">
        <section className="timer-section glass-panel">
          <ModeSwitcher currentMode={mode} onModeChange={switchMode} />
          
          <div className="timer-display">
            <ProgressRing progress={progress} color={currentModeColor} />
            <div className="timer-text">{formatTime(timeLeft)}</div>
          </div>

          <Controls 
            isActive={isActive} 
            onToggle={toggleTimer} 
            onReset={resetTimer} 
            onSkip={skipSession} 
          />

          <QuoteDisplay trigger={sessionsCompleted} />
        </section>

        <aside className="sidebar">
          <Stats />
          <Settings />
          <TaskList />
        </aside>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
};

export default App;
