import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SettingsProvider } from './src/contexts/SettingsContext';
import { TimerScreen } from './src/screens/TimerScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'timer' | 'settings'>('timer');

  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <StatusBar style="dark" />
        <View style={{ flex: 1 }}>
          <View style={{ 
            flex: 1, 
            display: currentScreen === 'timer' ? 'flex' : 'none' 
          }}>
            <TimerScreen onNavigateToSettings={() => setCurrentScreen('settings')} />
          </View>
          <View style={{ 
            flex: 1, 
            display: currentScreen === 'settings' ? 'flex' : 'none' 
          }}>
            <SettingsScreen onNavigateBack={() => setCurrentScreen('timer')} />
          </View>
        </View>
      </SettingsProvider>
    </SafeAreaProvider>
  );
}
