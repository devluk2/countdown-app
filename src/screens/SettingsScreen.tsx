import React from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettings } from '../contexts/SettingsContext';
import { AlarmSound } from '../types';
import { playAlarmSound } from '../utils/alerts';

interface SettingsScreenProps {
  onNavigateBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onNavigateBack }) => {
  const { settings, updateSettings } = useSettings();

  const alarmSoundOptions: { value: AlarmSound; label: string }[] = [
    { value: 'beep-24', label: 'Classic Beep' },
    { value: 'button-35', label: 'Button Click' },
    { value: 'button-42', label: 'Soft Click' },
    { value: 'button-49', label: 'Deep Click' },
  ];

  const handleAlarmSoundChange = async (sound: AlarmSound) => {
    await updateSettings({ alarmSound: sound });
    // Play a preview of the selected sound
    if (settings.soundEnabled) {
      playAlarmSound(sound);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          {onNavigateBack && (
            <TouchableOpacity style={styles.backButton} onPress={onNavigateBack}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.title}>Settings</Text>
        </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Sound</Text>
            <Text style={styles.settingDescription}>Play alarm sound when timer completes</Text>
          </View>
          <Switch
            value={settings.soundEnabled}
            onValueChange={(value) => updateSettings({ soundEnabled: value })}
            trackColor={{ false: '#767577', true: '#81C784' }}
            thumbColor={settings.soundEnabled ? '#4CAF50' : '#f4f3f4'}
          />
        </View>

        {settings.soundEnabled && (
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Alarm Sound</Text>
              <Text style={styles.settingDescription}>Choose your preferred alarm sound</Text>
            </View>
            <View style={styles.soundOptionsContainer}>
              {alarmSoundOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.soundOption,
                    settings.alarmSound === option.value && styles.soundOptionSelected
                  ]}
                  onPress={() => handleAlarmSoundChange(option.value)}
                >
                  <Text style={[
                    styles.soundOptionText,
                    settings.alarmSound === option.value && styles.soundOptionTextSelected
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Vibration</Text>
            <Text style={styles.settingDescription}>Vibrate when timer completes</Text>
          </View>
          <Switch
            value={settings.vibrationEnabled}
            onValueChange={(value) => updateSettings({ vibrationEnabled: value })}
            trackColor={{ false: '#767577', true: '#81C784' }}
            thumbColor={settings.vibrationEnabled ? '#4CAF50' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Repeat Timer</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Enable Repeat</Text>
            <Text style={styles.settingDescription}>
              Automatically restart timer after completion
            </Text>
          </View>
          <Switch
            value={settings.repeatEnabled}
            onValueChange={(value) => updateSettings({ repeatEnabled: value })}
            trackColor={{ false: '#767577', true: '#81C784' }}
            thumbColor={settings.repeatEnabled ? '#4CAF50' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Countdown Timer App</Text>
        <Text style={styles.footerText}>Version 1.0.0</Text>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 20,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  backIcon: {
    fontSize: 32,
    color: '#2196F3',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginBottom: 20,
    borderRadius: 12,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2196F3',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: '#666',
  },
  footer: {
    alignItems: 'center',
    padding: 30,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    marginVertical: 2,
  },
  soundOptionsContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 8,
  },
  soundOption: {
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  soundOptionSelected: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
  },
  soundOptionText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  soundOptionTextSelected: {
    color: '#2196F3',
    fontWeight: '500',
  },
});
