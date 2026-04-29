export type TimerMode = 'work' | 'shortBreak' | 'longBreak';

export interface Settings {
  workTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  autoStartBreaks: boolean;
  autoStartWork: boolean;
  soundEnabled: boolean;
  longBreakInterval: number;
}

export interface SessionHistory {
  date: string;
  type: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}
