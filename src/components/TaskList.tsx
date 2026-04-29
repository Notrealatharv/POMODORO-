// # create a todo list with add and delete functionality
// # add priority levels (low, medium, high) to tasks with color coding
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import type { Task } from '../types';

export const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('pomodoro-tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem('pomodoro-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const task: Task = {
      id: Date.now().toString(),
      text: newTask,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    setTasks([task, ...tasks]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="glass-panel stat-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h3 className="card-title">Tasks</h3>
      
      <form onSubmit={addTask} style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
        <input
          type="text"
          className="setting-input"
          style={{ flex: 1, textAlign: 'left', padding: '10px 15px', width: 'auto' }}
          placeholder="What are you working on?"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit" className="premium-button" style={{ padding: '8px 12px' }}>
          <Plus size={20} />
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '300px' }}>
        {tasks.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '2rem 0' }}>
            Your task list is empty. Add a task to stay focused!
          </p>
        ) : (
          tasks.map(task => (
            <div 
              key={task.id} 
              className="glass-panel" 
              style={{ 
                padding: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                border: task.completed ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid var(--glass-border)',
                opacity: task.completed ? 0.6 : 1
              }}
            >
              <button onClick={() => toggleTask(task.id)} style={{ color: task.completed ? 'var(--accent-break)' : 'var(--text-muted)' }}>
                {task.completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
              </button>
              <span style={{ 
                flex: 1, 
                fontSize: '0.95rem', 
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'var(--text-muted)' : 'var(--text)'
              }}>
                {task.text}
              </span>
              <button 
                onClick={() => deleteTask(task.id)} 
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-work)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
