# 📱 Countdown Timer App

A simple, cross-platform countdown timer app built with React Native and Expo.

## ✨ Features

- ⏱️ **Custom Timer**: Set hours, minutes, and seconds
- 🔔 **Smart Notifications**: Alerts when timer completes
- 📳 **Vibration**: Haptic feedback on completion
- 🔊 **Sound Alerts**: Audio beep when time's up
- 🔄 **Repeat Mode**: Automatically restart timer
- 💾 **Session Memory**: Remembers your last timer setting
- ⚙️ **Settings**: Customize sound, vibration, and repeat options
- 🌍 **Cross-Platform**: Works on iOS and Android

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/devluk2/countdown-app.git
cd countdown-app

# Install dependencies
npm install

# Start the app
npm start
```

Scan the QR code with **Expo Go** app on your phone to run the timer!

## 📱 How to Use

1. **Set Time**: Enter hours, minutes, seconds
2. **Start Timer**: Tap the START button
3. **Control**: Use PAUSE/RESUME/RESET as needed
4. **Settings**: Tap ⚙️ to customize alerts and repeat mode

## 🛠️ Built With

- **React Native** + **Expo** - Cross-platform mobile framework
- **TypeScript** - Type-safe development
- **Context API** - State management
- **AsyncStorage** - Settings persistence
- **Expo Notifications** - Timer completion alerts
- **Expo Haptics** - Vibration feedback

## 📁 Project Structure

```
src/
├── components/     # UI components (TimerDisplay, TimeInput, TimerControls)
├── screens/       # App screens (TimerScreen, SettingsScreen)
├── hooks/         # Custom hooks (useTimer)
├── contexts/      # React contexts (SettingsContext)
├── utils/         # Utility functions (alerts, notifications, time)
└── types/         # TypeScript type definitions
```

## 🤝 Contributing

Feel free to open issues and pull requests!

## 📄 License

MIT License - feel free to use this project however you'd like!
