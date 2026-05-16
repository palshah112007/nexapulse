import { Link, Stack } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Screen, Text } from '@/src/components/ui';
import { useTheme } from '@/src/hooks/useTheme';

export default function NotFoundScreen() {
  const { colors } = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: 'Not Found', headerShown: false }} />
      <Screen scroll={false} className="items-center justify-center">
        <Text variant="title" className="mb-2">
          Page not found
        </Text>
        <Text variant="body" secondary className="text-center mb-8">
          The screen you&apos;re looking for doesn&apos;t exist.
        </Text>
        <Link href="/" asChild>
          <Pressable
            className="px-6 py-3 rounded-2xl"
            style={{ backgroundColor: colors.tint }}
          >
            <Text style={{ color: '#fff' }} className="font-semibold">
              Go home
            </Text>
          </Pressable>
        </Link>
      </Screen>
    </>
  );
}
