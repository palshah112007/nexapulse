import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Text } from '@/src/components/ui/Text';
import { useTheme } from '@/src/hooks/useTheme';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  const { colors } = useTheme();

  return (
    <Animated.View entering={FadeInDown.springify()} className="mb-10">
      <LinearGradient
        colors={[...colors.gradient]}
        className="w-16 h-16 rounded-2xl items-center justify-center mb-6"
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={{ color: '#fff', fontSize: 28, fontWeight: '800' }}>N</Text>
      </LinearGradient>
      <Text variant="label" secondary className="mb-2">
        NexaPulse
      </Text>
      <Text variant="title" className="mb-2">
        {title}
      </Text>
      <Text variant="body" secondary>
        {subtitle}
      </Text>
    </Animated.View>
  );
}
