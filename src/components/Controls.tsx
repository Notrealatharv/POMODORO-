// # create timer controls for playing, pausing, skipping, and resetting
import React from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

interface ControlsProps {
  isActive: boolean;
  onToggle: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ isActive, onToggle, onReset, onSkip }) => {
  return (
    <div className="controls">
      <button onClick={() => { console.log('Reset clicked'); onReset(); }} className="glass-panel" style={{ padding: '12px', borderRadius: '50%' }} title="Reset">
        <RotateCcw size={20} />
      </button>
      
      <button onClick={() => { console.log('Toggle clicked', !isActive); onToggle(); }} className="premium-button" style={{ 
        width: '80px', 
        height: '80px', 
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        position: 'relative',
        zIndex: 20
      }}>
        {isActive ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" style={{ marginLeft: '4px' }} />}
      </button>

      <button onClick={() => { console.log('Skip clicked'); onSkip(); }} className="glass-panel" style={{ padding: '12px', borderRadius: '50%' }} title="Skip">
        <SkipForward size={20} />
      </button>
    </div>
  );
};
