// # create a settings panel for user preferences and timer durations
import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { Settings as SettingsIcon, Volume2, VolumeX } from 'lucide-react';

export const Settings: React.FC = () => {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="glass-panel stat-card">
      <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <SettingsIcon size={16} /> Settings
      </h3>
      
      <div className="settings-panel">
        <div className="setting-item">
          <label>Work</label>
          <input 
            type="number" 
            className="setting-input" 
            value={settings.workTime} 
            onChange={(e) => updateSettings({ workTime: parseInt(e.target.value) || 1 })}
          />
        </div>
        
        <div className="setting-item">
          <label>Short Break</label>
          <input 
            type="number" 
            className="setting-input" 
            value={settings.shortBreakTime} 
            onChange={(e) => updateSettings({ shortBreakTime: parseInt(e.target.value) || 1 })}
          />
        </div>

        <div className="setting-item">
          <label>Long Break</label>
          <input 
            type="number" 
            className="setting-input" 
            value={settings.longBreakTime} 
            onChange={(e) => updateSettings({ longBreakTime: parseInt(e.target.value) || 1 })}
          />
        </div>

        <div className="setting-item">
          <label>Sound</label>
          <button onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}>
            {settings.soundEnabled ? <Volume2 size={20} className="text-primary" /> : <VolumeX size={20} className="text-muted" />}
          </button>
        </div>
      </div>
    </div>
  );
};
