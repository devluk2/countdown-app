import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TimerDisplay } from '../components/TimerDisplay';
import { TimeInput } from '../components/TimeInput';
import { TimerControls } from '../components/TimerControls';
import { useTimer } from '../hooks/useTimer';
import { requestNotificationPermissions } from '../utils/notifications';
import { DEFAULT_TIMER_DURATION } from '../utils/constants';

const TIMER_DURATION_KEY = '@countdown_app_timer_duration';

interface TimerScreenProps {
  onNavigateToSettings: () => void;
}

export const TimerScreen: React.FC<TimerScreenProps> = ({ onNavigateToSettings }) => {
  const [timeToStart, setTimeToStart] = useState(DEFAULT_TIMER_DURATION); // Default 30 seconds
  const { timeRemaining, initialTime, status, startTimer, pauseTimer, resumeTimer, resetTimer, restartTimer } = useTimer();

  useEffect(() => {
    // Request notification permissions on mount
    requestNotificationPermissions();
    
    // Load saved timer duration
    loadSavedTimerDuration();
  }, []);

  const loadSavedTimerDuration = async () => {
    try {
      const savedDuration = await AsyncStorage.getItem(TIMER_DURATION_KEY);
      if (savedDuration) {
        setTimeToStart(parseInt(savedDuration, 10));
      }
    } catch (error) {
      console.error('Error loading saved timer duration:', error);
    }
  };

  const handleTimeSet = async (seconds: number) => {
    setTimeToStart(seconds);
    // Save to session storage
    try {
      await AsyncStorage.setItem(TIMER_DURATION_KEY, seconds.toString());
    } catch (error) {
      console.error('Error saving timer duration:', error);
    }
  };

  const handleStart = () => {
    if (timeToStart > 0) {
      startTimer(timeToStart);
    }
  };

  const handleReset = () => {
    resetTimer();
    // Keep the current timeToStart value for display
  };

  // Show the appropriate time based on timer status
  const displayTime = status === 'idle' ? timeToStart : timeRemaining;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Countdown Timer</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={onNavigateToSettings}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TimerDisplay timeRemaining={displayTime} status={status} />

          <TimeInput
            onTimeSet={handleTimeSet}
            disabled={status !== 'idle'}
            initialTime={timeToStart}
          />

          <TimerControls
            status={status}
            timeToStart={timeToStart}
            onStart={handleStart}
            onPause={pauseTimer}
            onResume={resumeTimer}
            onReset={handleReset}
            onRestart={restartTimer}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  settingsButton: {
    padding: 8,
  },
  settingsIcon: {
    fontSize: 28,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
});
