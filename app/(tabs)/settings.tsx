import { Alert } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useState } from 'react';

import { SettingsRow } from '@/src/components/settings/SettingsRow';
import { Card, Screen, Text } from '@/src/components/ui';
import { APP_CONFIG } from '@/src/constants/config';
import { useAuth } from '@/src/hooks/useAuth';
import { useTheme } from '@/src/hooks/useTheme';
import { ThemeMode } from '@/src/types';

export default function SettingsScreen() {
  const { signOut } = useAuth();
  const { mode, resolvedTheme, setMode, toggleTheme, colors } = useTheme();
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const showAction = (title: string, message: string) => {
    Alert.alert(title, message);
  };

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await signOut();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  const themeLabel =
    mode === 'system' ? 'System' : mode === 'dark' ? 'Dark' : 'Light';

  return (
    <Screen>
      <Animated.View entering={FadeInDown.springify()} className="pt-2 pb-6">
        <Text variant="title">Settings</Text>
        <Text variant="body" secondary className="mt-1">
          Customize your experience
        </Text>
      </Animated.View>

      <Text variant="label" secondary className="mb-2 ml-1">
        APPEARANCE
      </Text>
      <Card delay={100} noPadding className="mb-6">
        <SettingsRow
          icon="moon-outline"
          label="Dark Mode"
          toggle
          toggleValue={resolvedTheme === 'dark'}
          onToggle={() => toggleTheme()}
          showChevron={false}
        />
        <SettingsRow
          icon="phone-portrait-outline"
          label="Theme"
          value={themeLabel}
          onPress={() => {
            const modes: ThemeMode[] = ['light', 'dark', 'system'];
            const idx = modes.indexOf(mode);
            setMode(modes[(idx + 1) % modes.length]);
          }}
          isLast
        />
      </Card>

      <Text variant="label" secondary className="mb-2 ml-1">
        ACCOUNT
      </Text>
      <Card delay={200} noPadding className="mb-6">
        <SettingsRow
          icon="person-outline"
          label="Edit Profile"
          onPress={() => showAction('Edit Profile', 'Profile editor is ready for your user API.')}
        />
        <SettingsRow
          icon="lock-closed-outline"
          label="Change Password"
          onPress={() => showAction('Change Password', 'Connect this to Firebase password reset or your auth API.')}
        />
        <SettingsRow
          icon="finger-print-outline"
          label="Biometric Login"
          toggle
          toggleValue={biometricEnabled}
          onToggle={(value) => {
            setBiometricEnabled(value);
            showAction(
              'Biometric Login',
              value
                ? 'Biometric login is enabled in this preview.'
                : 'Biometric login is disabled in this preview.'
            );
          }}
          showChevron={false}
          isLast
        />
      </Card>

      <Text variant="label" secondary className="mb-2 ml-1">
        PREFERENCES
      </Text>
      <Card delay={300} noPadding className="mb-6">
        <SettingsRow
          icon="notifications-outline"
          label="Notifications"
          onPress={() => showAction('Notifications', 'Push notification controls can be connected here.')}
        />
        <SettingsRow
          icon="language-outline"
          label="Language"
          value="English"
          onPress={() => showAction('Language', 'English is selected. More languages can be loaded from config.')}
        />
        <SettingsRow
          icon="cloud-outline"
          label="Data & Storage"
          onPress={() => showAction('Data & Storage', 'Cache, export, and sync controls will live here.')}
          isLast
        />
      </Card>

      <Text variant="label" secondary className="mb-2 ml-1">
        ABOUT
      </Text>
      <Card delay={400} noPadding className="mb-6">
        <SettingsRow
          icon="information-circle-outline"
          label="Version"
          value={APP_CONFIG.version}
          showChevron={false}
        />
        <SettingsRow
          icon="document-text-outline"
          label="Privacy Policy"
          onPress={() => showAction('Privacy Policy', 'Open your hosted privacy policy URL from this action.')}
        />
        <SettingsRow
          icon="log-out-outline"
          label="Sign Out"
          onPress={handleSignOut}
          destructive
          showChevron={false}
          isLast
        />
      </Card>
    </Screen>
  );
}
