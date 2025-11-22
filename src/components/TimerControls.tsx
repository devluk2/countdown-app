import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TimerStatus } from '../types';
import { useSettings } from '../contexts/SettingsContext';

interface TimerControlsProps {
  status: TimerStatus;
  timeToStart: number;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onRestart: () => void;
}

export const TimerControls: React.FC<TimerControlsProps> = ({
  status,
  timeToStart,
  onStart,
  onPause,
  onResume,
  onReset,
  onRestart,
}) => {
  const { settings } = useSettings();
  const renderButtons = () => {
    switch (status) {
      case 'idle':
        return (
          <TouchableOpacity
            style={[styles.button, styles.startButton, timeToStart === 0 && styles.buttonDisabled]}
            onPress={onStart}
            disabled={timeToStart === 0}
          >
            <Text style={styles.buttonText}>START</Text>
          </TouchableOpacity>
        );

      case 'running':
        return (
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.pauseButton]} onPress={onPause}>
              <Text style={styles.buttonText}>PAUSE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={onReset}>
              <Text style={styles.buttonText}>RESET</Text>
            </TouchableOpacity>
          </View>
        );

      case 'paused':
        return (
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.resumeButton]} onPress={onResume}>
              <Text style={styles.buttonText}>RESUME</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={onReset}>
              <Text style={styles.buttonText}>RESET</Text>
            </TouchableOpacity>
          </View>
        );

      case 'completed':
        return (
          <View style={styles.buttonRow}>
            {!settings.repeatEnabled && (
              <TouchableOpacity style={[styles.button, styles.restartButton]} onPress={onRestart}>
                <Text style={styles.buttonText}>RESTART</Text>
              </TouchableOpacity>
            )}
            {settings.repeatEnabled && (
              <TouchableOpacity style={[styles.button, styles.pauseButton]} onPress={onPause}>
                <Text style={styles.buttonText}>PAUSE</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={onReset}>
              <Text style={styles.buttonText}>RESET</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return <View style={styles.container}>{renderButtons()}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  pauseButton: {
    backgroundColor: '#FF9800',
  },
  resumeButton: {
    backgroundColor: '#2196F3',
  },
  resetButton: {
    backgroundColor: '#757575',
  },
  restartButton: {
    backgroundColor: '#2196F3',
  },
  buttonDisabled: {
    backgroundColor: '#BDBDBD',
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
