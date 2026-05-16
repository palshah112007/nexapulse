import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Text } from '@/src/components/ui/Text';
import { useTheme } from '@/src/hooks/useTheme';
import { DashboardStat } from '@/src/types';

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  'trending-up': 'trending-up',
  people: 'people',
  cart: 'cart',
  analytics: 'analytics',
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface StatCardProps {
  stat: DashboardStat;
  index: number;
  selected?: boolean;
  onPress?: () => void;
}

export function StatCard({ stat, index, selected, onPress }: StatCardProps) {
  const { colors } = useTheme();
  const isPositive = stat.change >= 0;
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 80).springify()}
      style={{ flex: 1, minWidth: '45%' }}
    >
      <AnimatedPressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onPress?.();
        }}
        onPressIn={() => {
          scale.value = withSpring(0.96, { damping: 15 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 15 });
        }}
        style={[
          animatedStyle,
          {
            backgroundColor: colors.card,
            borderRadius: 24,
            padding: 20,
            borderWidth: selected ? 2 : 1,
            borderColor: selected ? colors.tint : colors.border,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: selected ? 0.12 : 0.06,
            shadowRadius: 12,
            elevation: selected ? 5 : 3,
          },
        ]}
      >
        <View className="flex-row items-center justify-between mb-3">
          <View
            className="w-10 h-10 rounded-xl items-center justify-center"
            style={{ backgroundColor: `${colors.tint}20` }}
          >
            <Ionicons
              name={iconMap[stat.icon] ?? 'stats-chart'}
              size={20}
              color={colors.tint}
            />
          </View>
          <View
            className="flex-row items-center px-2 py-1 rounded-full"
            style={{
              backgroundColor: isPositive ? `${colors.success}20` : `${colors.danger}20`,
            }}
          >
            <Ionicons
              name={isPositive ? 'arrow-up' : 'arrow-down'}
              size={12}
              color={isPositive ? colors.success : colors.danger}
            />
            <Text
              variant="caption"
              style={{
                color: isPositive ? colors.success : colors.danger,
                marginLeft: 2,
                fontWeight: '600',
              }}
            >
              {Math.abs(stat.change)}%
            </Text>
          </View>
        </View>
        <Text variant="heading">{stat.value}</Text>
        <Text variant="caption" secondary>
          {stat.label}
        </Text>
        {selected && (
          <View className="absolute top-3 right-3">
            <Ionicons name="checkmark-circle" size={18} color={colors.tint} />
          </View>
        )}
      </AnimatedPressable>
    </Animated.View>
  );
}
