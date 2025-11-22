import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av'; // Keep expo-av for now since expo-audio has different API
import { AlarmSound } from '../types';

// Alarm sound mappings
const ALARM_SOUNDS: Record<AlarmSound, any> = {
  'beep-24': require('../../assets/beep-24.mp3'),
  'button-35': require('../../assets/button-35.mp3'),
  'button-42': require('../../assets/button-42.mp3'),
  'button-49': require('../../assets/button-49.mp3'),
};

export const triggerVibration = async () => {
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch (error) {
    console.error('Error triggering vibration:', error);
  }
};

export const triggerHeavyVibration = async () => {
  try {
    // Trigger multiple vibrations for alarm effect
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 300);
    setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 600);
  } catch (error) {
    console.error('Error triggering heavy vibration:', error);
  }
};

let soundObject: Audio.Sound | null = null;

export const playAlarmSound = async (alarmSound: AlarmSound = 'beep-24') => {
  try {
    // Stop any currently playing sound
    if (soundObject) {
      await soundObject.unloadAsync();
      soundObject = null;
    }

    // Configure audio mode
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    });

    // Create and play the selected alarm sound
    soundObject = new Audio.Sound();
    await soundObject.loadAsync(ALARM_SOUNDS[alarmSound]);
    await soundObject.setVolumeAsync(1.0);
    await soundObject.playAsync();
  } catch (error) {
    console.error('Error playing alarm sound:', error);
    // Fallback: try to trigger a system beep via haptics
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } catch (hapticError) {
      console.error('Fallback haptic also failed:', hapticError);
    }
  }
};

export const stopAlarmSound = async () => {
  try {
    if (soundObject) {
      await soundObject.stopAsync();
      await soundObject.unloadAsync();
      soundObject = null;
    }
  } catch (error) {
    console.error('Error stopping alarm sound:', error);
  }
};
