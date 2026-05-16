# NexaPulse

NexaPulse is a production-ready React Native analytics app built with **Expo SDK 54**, **TypeScript**, **Expo Router**, **NativeWind**, and **Firebase**. It includes an Apple-inspired mobile UI, dark/light mode, smooth animations, guarded auth flows, tab navigation, interactive graphs, and an API-ready service layer.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | React Native + Expo SDK 54 |
| Language | TypeScript |
| Routing | Expo Router |
| Styling | NativeWind |
| Navigation | React Navigation via Expo Router |
| Auth | Firebase Auth plus demo mode |
| API | Fetch client with token support |
| Animations | React Native Reanimated |
| Storage | AsyncStorage + Expo Secure Store |

## Project Structure

```text
premium-ios/
|-- app/                    # Expo Router screens
|   |-- (auth)/             # Login, register, forgot password
|   |-- (tabs)/             # Home, profile, settings
|   |-- _layout.tsx         # Root providers and navigation theme
|   `-- index.tsx           # Auth redirect
|-- src/
|   |-- components/         # Reusable UI and feature components
|   |-- constants/          # App config and theme tokens
|   |-- context/            # Auth and theme providers
|   |-- data/               # Dashboard seed data
|   |-- hooks/              # Custom hooks
|   |-- services/
|   |   |-- api/            # API client and endpoints
|   |   `-- firebase/       # Firebase config and auth
|   |-- types/              # TypeScript models
|   `-- utils/              # Storage helpers
|-- assets/                 # App icons, splash, fonts
|-- global.css              # NativeWind directives
|-- tailwind.config.js
|-- metro.config.cjs
`-- babel.config.js
```

## Prerequisites

- Node.js **20.19.x or newer** for Expo SDK 54
- npm
- Expo Go on your iPhone
- Optional: Xcode on macOS for the iOS Simulator

## Local Setup

1. Open the project folder:

```powershell
cd "C:\Users\PAL\Desktop\ios app\premium-ios"
```

2. Install dependencies:

```powershell
npm install
```

3. Optional: configure Firebase.

```powershell
copy .env.example .env
```

Add your Firebase web app credentials from Firebase Console > Project Settings > Your apps.

Without Firebase credentials, the app runs in demo mode. Use any email address and a password with at least 6 characters.

4. Start Expo:

```powershell
npx.cmd expo start
```

5. Run on iPhone:

- Keep your iPhone and PC on the same Wi-Fi network.
- Open Expo Go.
- Scan the QR code shown by Expo.

## Useful Commands

```powershell
npm start
npm run web
npm run android
npm run ios
npx.cmd tsc --noEmit
```

On Windows PowerShell, use `npx.cmd` if script execution policy blocks `npx`.

## Environment Variables

| Variable | Description |
| --- | --- |
| `EXPO_PUBLIC_FIREBASE_API_KEY` | Firebase API key |
| `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `EXPO_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `EXPO_PUBLIC_FIREBASE_APP_ID` | Firebase app ID |
| `EXPO_PUBLIC_API_BASE_URL` | Backend API base URL |

Restart Expo after changing `.env`.

## Included Features

- Authentication screens: login, registration, forgot password
- Firebase Auth integration with safe demo fallback
- Bottom tab navigation: Home, Profile, Settings
- Home dashboard with stats, chart, quick actions, refresh, and activity feed
- Interactive visual command center with portfolio mix, conversion funnel, and live figures
- Profile page with account summary and premium member state
- Settings page with clickable actions and light, dark, and system theme support
- Reusable UI components for screens, cards, inputs, buttons, avatars, text, and rows
- Smooth Reanimated transitions and press feedback
- NativeWind styling and centralized theme tokens
- API-ready folder with token-aware request helper

## Production Build

```powershell
npm install -g eas-cli
eas login
eas build:configure
eas build --platform ios
```

Read the Expo SDK 54 docs when upgrading or adding Expo SDK packages, and install SDK packages with `npx.cmd expo install` so versions stay aligned.

## License

Private. All rights reserved.
