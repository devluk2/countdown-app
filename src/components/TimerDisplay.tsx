import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatTime } from '../utils/timeUtils';

interface TimerDisplayProps {
  timeRemaining: number;
  status: string;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeRemaining, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'running':
        return '#4CAF50';
      case 'paused':
        return '#FF9800';
      case 'completed':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.timer, { color: getStatusColor() }]}>
        {formatTime(timeRemaining)}
      </Text>
      <Text style={styles.status}>
        {status.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  timer: {
    fontSize: 72,
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
    letterSpacing: 4,
  },
  status: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
    letterSpacing: 2,
  },
});
