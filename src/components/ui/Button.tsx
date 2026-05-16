import { ActivityIndicator, Pressable, PressableProps, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useTheme } from '@/src/hooks/useTheme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends PressableProps {
  title: string;
  variant?: Variant;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({
  title,
  variant = 'primary',
  loading = false,
  icon,
  fullWidth = true,
  disabled,
  onPressIn,
  onPressOut,
  onPress,
  className,
  ...props
}: ButtonProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = (e: Parameters<NonNullable<PressableProps['onPressIn']>>[0]) => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 400 });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPressIn?.(e);
  };

  const handlePressOut = (e: Parameters<NonNullable<PressableProps['onPressOut']>>[0]) => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    onPressOut?.(e);
  };

  const isDisabled = disabled || loading;

  if (variant === 'primary') {
    return (
      <AnimatedPressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        style={[animatedStyle, fullWidth && { width: '100%' }]}
        className={className}
        {...props}
      >
        <LinearGradient
          colors={[...colors.gradient]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-2xl py-4 px-6 flex-row items-center justify-center"
          style={{ opacity: isDisabled ? 0.6 : 1 }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <View className="flex-row items-center gap-2">
              {icon}
              <Text className="text-white text-base font-semibold">{title}</Text>
            </View>
          )}
        </LinearGradient>
      </AnimatedPressable>
    );
  }

  const variantClass: Record<Exclude<Variant, 'primary'>, string> = {
    secondary: 'bg-transparent border-2',
    ghost: 'bg-transparent',
    danger: 'bg-red-500/10',
  };

  const textColor: Record<Exclude<Variant, 'primary'>, string> = {
    secondary: colors.tint,
    ghost: colors.tint,
    danger: colors.danger,
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      style={[
        animatedStyle,
        fullWidth && { width: '100%' },
        variant === 'secondary' && { borderColor: colors.tint },
      ]}
      className={`rounded-2xl py-4 px-6 flex-row items-center justify-center ${variantClass[variant]} ${className ?? ''}`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={colors.tint} />
      ) : (
        <View className="flex-row items-center gap-2">
          {icon}
          <Text style={{ color: textColor[variant] }} className="text-base font-semibold">
            {title}
          </Text>
        </View>
      )}
    </AnimatedPressable>
  );
}
