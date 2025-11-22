export type AlarmSound = 'beep-24' | 'button-35' | 'button-42' | 'button-49';

export interface TimerSettings {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  repeatEnabled: boolean;
  alarmSound: AlarmSound;
}

export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed';

export interface TimerState {
  timeRemaining: number; // in seconds
  status: TimerStatus;
  initialTime: number;
}
