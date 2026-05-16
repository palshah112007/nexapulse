import { Alert, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Avatar, Button, Card, Screen, Text } from '@/src/components/ui';
import { useAuth } from '@/src/hooks/useAuth';
import { useTheme } from '@/src/hooks/useTheme';

const menuItems = [
  { icon: 'card-outline' as const, label: 'Billing', detail: 'Current plan: NexaPulse Pro / $49 monthly.' },
  { icon: 'notifications-outline' as const, label: 'Notifications', detail: '3 unread notifications are waiting in your workspace.' },
  { icon: 'shield-checkmark-outline' as const, label: 'Security', detail: 'Two-factor auth and biometric unlock are ready to connect.' },
  { icon: 'help-circle-outline' as const, label: 'Help & Support', detail: 'Open support chat, docs, or priority help from your backend.' },
];

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { colors } = useTheme();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  return (
    <Screen>
      <Animated.View entering={FadeInDown.springify()} className="items-center pt-6 pb-8">
        <Avatar name={user?.displayName ?? 'User'} imageUrl={user?.photoURL} size="xl" />
        <Text variant="title" className="mt-4 text-center">
          {user?.displayName ?? 'User'}
        </Text>
        <Text variant="body" secondary className="mt-1">
          {user?.email ?? ''}
        </Text>
        <View
          className="mt-3 px-4 py-1.5 rounded-full"
          style={{ backgroundColor: `${colors.tint}20` }}
        >
          <Text style={{ color: colors.tint }} className="text-sm font-semibold">
            Pro Member
          </Text>
        </View>
      </Animated.View>

      <Card delay={100} className="mb-4">
        <View className="flex-row justify-around py-2">
          {[
            { label: 'Projects', value: '12' },
            { label: 'Tasks', value: '48' },
            { label: 'Team', value: '6' },
          ].map((item) => (
            <View key={item.label} className="items-center">
              <Text variant="heading">{item.value}</Text>
              <Text variant="caption" secondary>
                {item.label}
              </Text>
            </View>
          ))}
        </View>
      </Card>

      <Card delay={200} noPadding className="mb-6">
        {menuItems.map((item, i) => (
          <Pressable
            key={item.label}
            onPress={() => Alert.alert(item.label, item.detail)}
            className="flex-row items-center py-4 px-5"
            style={{
              borderBottomWidth: i < menuItems.length - 1 ? 1 : 0,
              borderBottomColor: colors.border,
            }}
          >
            <Ionicons name={item.icon} size={22} color={colors.tint} />
            <Text className="flex-1 ml-3 font-medium">{item.label}</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </Pressable>
        ))}
      </Card>

      <Button title="Sign Out" variant="danger" onPress={handleSignOut} />
    </Screen>
  );
}
