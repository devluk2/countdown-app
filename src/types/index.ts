export interface TimerSettings {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  repeatEnabled: boolean;
}

export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed';

export interface TimerState {
  timeRemaining: number; // in seconds
  status: TimerStatus;
  initialTime: number;
}
