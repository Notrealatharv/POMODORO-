// # create a statistics panel to track completed pomodoro sessions
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Stats: React.FC = () => {
  const history = JSON.parse(localStorage.getItem('pomodoro-history') || '[]');
  
  // Basic logic to group sessions by day (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });

  const dataCounts = last7Days.map(date => {
    return history.filter((h: any) => h.date.startsWith(date)).length;
  });

  const data = {
    labels: last7Days.map(d => new Date(d).toLocaleDateString('en-US', { weekday: 'short' })),
    datasets: [
      {
        label: 'Sessions',
        data: dataCounts,
        backgroundColor: '#6366f1',
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#94a3b8' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8' }
      }
    }
  };

  return (
    <div className="glass-panel stat-card">
      <h3 className="card-title">Activity (Last 7 Days)</h3>
      <div style={{ height: '180px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};
