import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Check if running in Expo Go
const isExpoGo = Constants.executionEnvironment === 'storeClient';

// Configure how notifications should be handled when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const requestNotificationPermissions = async (): Promise<boolean> => {
  // Skip notifications in Expo Go
  if (isExpoGo) {
    console.warn('Push notifications are not supported in Expo Go. Use a development build for full functionality.');
    return false;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.warn('Notification permissions not granted');
    return false;
  }

  // For Android, configure notification channel
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('timer-alerts', {
      name: 'Timer Alerts',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      sound: 'default',
      enableVibrate: true,
    });
  }

  return true;
};

export const scheduleTimerNotification = async (soundEnabled: boolean, vibrationEnabled: boolean) => {
  // Skip notifications in Expo Go
  if (isExpoGo) {
    console.log('Timer completed! (Notifications not available in Expo Go)');
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Time's Up! ⏰",
      body: 'Your countdown timer has completed.',
      sound: soundEnabled ? 'default' : undefined,
      vibrate: vibrationEnabled ? [0, 250, 250, 250] : undefined,
    },
    trigger: null, // null means immediate
  });
};

export const cancelAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};
