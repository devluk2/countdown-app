# Countdown Timer App

A cross-platform mobile countdown timer app built with React Native and Expo. Available for both iOS and Android.

## Features

- ⏱️ **Customizable Timer**: Set hours, minutes, and seconds
- 🔔 **Notifications**: Receive alerts when timer completes
- 📳 **Vibration**: Haptic feedback on timer completion
- 🔊 **Sound Alerts**: Audible alarm when countdown reaches 00:00
- 🔄 **Repeat Timer**: Auto-restart timer at customizable intervals
- ⚙️ **Settings**: Configure sound, vibration, and repeat preferences
- 🎨 **Clean UI**: Intuitive and responsive interface

## Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Language**: TypeScript
- **State Management**: React Context API
- **Notifications**: Expo Notifications
- **Haptics**: Expo Haptics
- **Audio**: Expo AV
- **Storage**: AsyncStorage

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- For iOS: Mac with Xcode (or use Expo Go app)
- For Android: Android Studio (or use Expo Go app)

## Installation

1. Navigate to the project directory:
```bash
cd countdown-app
```

2. Install dependencies (already done):
```bash
npm install
```

## Running the App

### Using Expo Go (Easiest)

1. Install Expo Go on your phone:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Start the development server:
```bash
npm start
```

3. Scan the QR code with:
   - iOS: Camera app
   - Android: Expo Go app

### Android Emulator

```bash
npm run android
```

### iOS Simulator (Mac only)

```bash
npm run ios
```

## Project Structure

```
countdown-app/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── TimerDisplay.tsx
│   │   ├── TimeInput.tsx
│   │   └── TimerControls.tsx
│   ├── screens/          # Main app screens
│   │   ├── TimerScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── hooks/            # Custom React hooks
│   │   └── useTimer.ts
│   ├── utils/            # Utility functions
│   │   ├── notifications.ts
│   │   ├── alerts.ts
│   │   └── timeUtils.ts
│   ├── contexts/         # React Context providers
│   │   └── SettingsContext.tsx
│   └── types/            # TypeScript type definitions
│       └── index.ts
├── App.tsx               # Root component
├── app.json              # Expo configuration
└── package.json
```

## How to Use

1. **Set Timer**: Enter hours, minutes, and seconds on the main screen
2. **Start**: Tap START to begin countdown
3. **Pause/Resume**: Pause and resume the timer as needed
4. **Reset**: Reset to set a new time
5. **Settings**: Tap the gear icon (⚙️) to configure:
   - Enable/disable sound alerts
   - Enable/disable vibration
   - Enable repeat timer
   - Set repeat interval (1, 5, 10, or 15 minutes)

## Permissions

The app requires the following permissions:

### iOS
- Notifications
- Audio in background

### Android
- POST_NOTIFICATIONS
- VIBRATE
- RECEIVE_BOOT_COMPLETED
- SCHEDULE_EXACT_ALARM

Permissions are requested automatically when you first use the app.

## Building for Production

### Android APK

```bash
eas build --platform android --profile preview
```

### iOS IPA

```bash
eas build --platform ios --profile preview
```

For production builds and app store deployment, set up EAS Build:
```bash
npm install -g eas-cli
eas login
eas build:configure
```

## Troubleshooting

### Notifications not working
- Ensure you've granted notification permissions
- Check Settings app on your device
- Restart the app

### Sound not playing
- Check device volume
- Enable sound in app settings
- Ensure device is not in silent mode

### Vibration not working
- Enable vibration in app settings
- Check device vibration settings

## Future Enhancements

- [ ] Custom alarm sounds
- [ ] Multiple timers
- [ ] Timer presets
- [ ] Dark mode
- [ ] Timer history
- [ ] Background timer support
- [ ] Widget support

## License

MIT

## Author

Built with React Native and Expo
