import { useState, useEffect, useRef, useCallback } from 'react';
import { TimerStatus } from '../types';
import { useSettings } from '../contexts/SettingsContext';
import { scheduleTimerNotification } from '../utils/notifications';
import { triggerHeavyVibration, playAlarmSound } from '../utils/alerts';

export const useTimer = () => {
  const { settings } = useSettings();
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [status, setStatus] = useState<TimerStatus>('idle');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isAlertingRef = useRef(false);

  const handleTimerComplete = useCallback(async () => {
    if (isAlertingRef.current) return;
    isAlertingRef.current = true;

    setStatus('completed');

    // Trigger notifications
    await scheduleTimerNotification(settings.soundEnabled, settings.vibrationEnabled);

    // Trigger haptic feedback
    if (settings.vibrationEnabled) {
      await triggerHeavyVibration();
    }

    // Play alarm sound
    if (settings.soundEnabled) {
      await playAlarmSound(settings.alarmSound);
    }

    // Handle repeat
    if (settings.repeatEnabled) {
      setTimeout(() => {
        setTimeRemaining(initialTime);
        setStatus('running');
        isAlertingRef.current = false;
      }, 1000); // Wait 1 second before repeating
    } else {
      isAlertingRef.current = false;
    }
  }, [settings, initialTime]);

  useEffect(() => {
    if (status === 'running' && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [status, timeRemaining, handleTimerComplete]);

  const startTimer = (seconds: number) => {
    setInitialTime(seconds);
    setTimeRemaining(seconds);
    setStatus('running');
    isAlertingRef.current = false;
  };

  const pauseTimer = () => {
    setStatus('paused');
  };

  const resumeTimer = () => {
    if (status === 'paused' && timeRemaining > 0) {
      setStatus('running');
    }
  };

  const resetTimer = () => {
    setStatus('idle');
    setTimeRemaining(0);
    setInitialTime(0);
    isAlertingRef.current = false;
  };

  const restartTimer = () => {
    setTimeRemaining(initialTime);
    setStatus('running');
    isAlertingRef.current = false;
  };

  return {
    timeRemaining,
    initialTime,
    status,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    restartTimer,
  };
};
