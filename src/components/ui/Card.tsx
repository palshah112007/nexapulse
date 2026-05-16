import { View, ViewProps } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { useTheme } from '@/src/hooks/useTheme';

interface CardProps extends ViewProps {
  delay?: number;
  noPadding?: boolean;
}

export function Card({ children, delay = 0, noPadding, className, style, ...props }: CardProps) {
  const { colors } = useTheme();

  return (
    <Animated.View
      entering={FadeInDown.delay(delay).springify().damping(18)}
      className={`rounded-3xl ${noPadding ? '' : 'p-5'} ${className ?? ''}`}
      style={[
        {
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.border,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.06,
          shadowRadius: 12,
          elevation: 3,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Animated.View>
  );
}
