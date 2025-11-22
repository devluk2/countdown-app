# Countdown Timer App - Quick Start Guide

## 🚀 Getting Started

### First Time Setup

The project has been initialized and all dependencies are installed. You're ready to run the app!

### Running the App

**Option 1: Start Development Server**
```bash
npm start
```
This will open the Expo Dev Tools in your browser. You can then:
- Press `a` to open on Android emulator
- Press `i` to open on iOS simulator (Mac only)
- Scan QR code with Expo Go app on your physical device

**Option 2: Run Directly on Android**
```bash
npm run android
```

**Option 3: Run Directly on iOS (Mac only)**
```bash
npm run ios
```

## 📱 Using Expo Go (Recommended for Testing)

1. Install **Expo Go** on your phone:
   - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Android - Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Run `npm start` in the terminal

3. Scan the QR code:
   - **iOS**: Use the Camera app
   - **Android**: Use the Expo Go app's QR scanner

4. The app will load on your phone!

## 🎯 App Features Overview

### Main Timer Screen
- **Time Input**: Set hours, minutes, and seconds using the number inputs
- **START**: Begin the countdown
- **PAUSE**: Temporarily stop the timer
- **RESUME**: Continue from where you paused
- **RESET**: Clear timer and set new time
- **RESTART**: Start again with the same time

### Settings Screen (⚙️ icon)
- **Sound Toggle**: Enable/disable alarm sound on completion
- **Vibration Toggle**: Enable/disable vibration on completion
- **Repeat Timer**: Auto-restart timer when it completes
- **Repeat Interval**: Choose 1, 5, 10, or 15 minutes

### Notifications
- The app will request notification permissions on first launch
- Notifications appear even when app is in background
- Sound and vibration respect your settings

## 🛠️ Development Tips

### File Structure
- `src/components/` - Reusable UI components
- `src/screens/` - Main screens (Timer, Settings)
- `src/hooks/` - Custom hooks (useTimer)
- `src/utils/` - Utility functions (notifications, alerts)
- `src/contexts/` - State management (SettingsContext)
- `src/types/` - TypeScript types

### Making Changes
1. Edit any file in the `src/` directory
2. Save the file
3. The app will automatically reload (Fast Refresh)

### Debugging
- Press `Cmd + D` (iOS) or `Cmd + M` (Android) to open developer menu
- Enable "Debug Remote JS" for Chrome debugging
- Use `console.log()` to see output in terminal

## ⚠️ Common Issues

### "Metro bundler not running"
```bash
# Clear cache and restart
npm start --clear
```

### "Dependencies out of sync"
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Notifications not working
1. Ensure you accepted notification permissions
2. Check device settings
3. Restart the app

### TypeScript errors
```bash
# Check for errors
npx tsc --noEmit
```

## 📦 Building for Production

### Android APK (Development Build)
```bash
# Install EAS CLI if not already installed
npm install -g eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build APK
eas build --platform android --profile preview
```

### iOS IPA (Development Build)
```bash
# Build IPA (requires Apple Developer account)
eas build --platform ios --profile preview
```

### Production Builds
```bash
# Android
eas build --platform android --profile production

# iOS
eas build --platform ios --profile production
```

## 🔧 Customization Ideas

### Change Colors
Edit the StyleSheet objects in component files:
- `src/components/TimerDisplay.tsx` - Timer colors
- `src/components/TimerControls.tsx` - Button colors
- `src/screens/SettingsScreen.tsx` - Settings UI colors

### Add Custom Sounds
1. Add sound file to `assets/` folder
2. Update `src/utils/alerts.ts`
3. Load sound: `await soundObject.loadAsync(require('../../assets/your-sound.mp3'))`

### Add More Preset Times
Edit `src/screens/SettingsScreen.tsx` and add more `PresetButton` components

### Change App Icon
Replace files in `assets/` folder:
- `icon.png` - App icon (1024x1024)
- `adaptive-icon.png` - Android adaptive icon
- `splash-icon.png` - Splash screen

## 📝 Testing Checklist

- [ ] Timer starts correctly
- [ ] Timer pauses and resumes
- [ ] Timer resets to 00:00:00
- [ ] Notification appears at 00:00
- [ ] Sound plays (if enabled)
- [ ] Vibration works (if enabled)
- [ ] Repeat timer works
- [ ] Settings persist after app restart
- [ ] Works in background
- [ ] Works when device is locked

## 🤝 Need Help?

### Resources
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

### Check Logs
```bash
# View all logs
npm start

# View only errors
npm start 2>&1 | grep -i error
```

## 🎉 Ready to Go!

Your countdown timer app is fully set up and ready to use. Run `npm start` to begin development!

Happy coding! ⏱️
