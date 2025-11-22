import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av'; // Keep expo-av for now since expo-audio has different API

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

export const playAlarmSound = async () => {
  try {
    // Stop any currently playing sound
    if (soundObject) {
      await soundObject.unloadAsync();
    }

    // Configure audio mode
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    });

    // Create and play a beep sound using system sound
    soundObject = new Audio.Sound();
    
    // You can add custom sound file later in assets folder
    // For now, we'll use a simple approach
    // await soundObject.loadAsync(require('../../assets/alarm.mp3'));
    
    // Alternative: use system sound or URI
    await soundObject.loadAsync(require('../../assets/button-49.mp3'));
    await soundObject.playAsync();
  } catch (error) {
    console.error('Error playing alarm sound:', error);
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
