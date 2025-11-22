import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { DEFAULT_TIMER_DURATION } from '../utils/constants';

interface TimeInputProps {
  onTimeSet: (seconds: number) => void;
  disabled: boolean;
  initialTime?: number;
}

export const TimeInput: React.FC<TimeInputProps> = ({ onTimeSet, disabled, initialTime = DEFAULT_TIMER_DURATION }) => {
  // Initialize with current timer value or default
  const initHours = Math.floor(initialTime / 3600);
  const initMinutes = Math.floor((initialTime % 3600) / 60);
  const initSeconds = initialTime % 60;

  const [hours, setHours] = useState(initHours.toString().padStart(2, '0'));
  const [minutes, setMinutes] = useState(initMinutes.toString().padStart(2, '0'));
  const [seconds, setSeconds] = useState(initSeconds.toString().padStart(2, '0'));

  // Calculate initial total on mount
  useEffect(() => {
    calculateTotal(hours, minutes, seconds);
  }, []);

  const handleChange = (value: string, setter: (val: string) => void, max: number) => {
    const numValue = parseInt(value, 10);
    if (value === '' || (numValue >= 0 && numValue <= max)) {
      setter(value);
      calculateTotal(
        setter === setHours ? value : hours,
        setter === setMinutes ? value : minutes,
        setter === setSeconds ? value : seconds
      );
    }
  };

  const calculateTotal = (h: string, m: string, s: string) => {
    const totalSeconds =
      (parseInt(h, 10) || 0) * 3600 +
      (parseInt(m, 10) || 0) * 60 +
      (parseInt(s, 10) || 0);
    onTimeSet(totalSeconds);
  };

  const formatInput = (value: string) => {
    if (value === '') return '00';
    return value.padStart(2, '0');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoid}
    >
      <View style={styles.container}>
        <Text style={styles.label}>Set Timer</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputGroup}>
            <TextInput
              style={[styles.input, disabled && styles.inputDisabled]}
              value={hours}
              onChangeText={(val) => handleChange(val, setHours, 23)}
              onBlur={() => setHours(formatInput(hours))}
              keyboardType="number-pad"
              maxLength={2}
              editable={!disabled}
              selectTextOnFocus
            />
            <Text style={styles.inputLabel}>Hours</Text>
          </View>

          <Text style={styles.separator}>:</Text>

          <View style={styles.inputGroup}>
            <TextInput
              style={[styles.input, disabled && styles.inputDisabled]}
              value={minutes}
              onChangeText={(val) => handleChange(val, setMinutes, 59)}
              onBlur={() => setMinutes(formatInput(minutes))}
              keyboardType="number-pad"
              maxLength={2}
              editable={!disabled}
              selectTextOnFocus
            />
            <Text style={styles.inputLabel}>Minutes</Text>
          </View>

          <Text style={styles.separator}>:</Text>

          <View style={styles.inputGroup}>
            <TextInput
              style={[styles.input, disabled && styles.inputDisabled]}
              value={seconds}
              onChangeText={(val) => handleChange(val, setSeconds, 59)}
              onBlur={() => setSeconds(formatInput(seconds))}
              keyboardType="number-pad"
              maxLength={2}
              editable={!disabled}
              selectTextOnFocus
            />
            <Text style={styles.inputLabel}>Seconds</Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputGroup: {
    alignItems: 'center',
  },
  input: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: '#2196F3',
    borderRadius: 12,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#F5F5F5',
  },
  inputDisabled: {
    backgroundColor: '#E0E0E0',
    borderColor: '#9E9E9E',
  },
  inputLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  separator: {
    fontSize: 32,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: '#333',
  },
});