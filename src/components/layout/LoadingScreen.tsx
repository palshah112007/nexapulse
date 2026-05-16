import { ActivityIndicator, View } from 'react-native';

import { useTheme } from '@/src/hooks/useTheme';

export function LoadingScreen() {
  const { colors } = useTheme();

  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: colors.background }}
    >
      <ActivityIndicator size="large" color={colors.tint} />
    </View>
  );
}
