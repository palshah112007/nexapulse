import { Pressable, ScrollView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInRight, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { Text } from '@/src/components/ui/Text';
import { quickActions } from '@/src/data/mockDashboard';
import { useTheme } from '@/src/hooks/useTheme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface QuickActionsProps {
  onAction: (id: string) => void;
}

export function QuickActions({ onAction }: QuickActionsProps) {
  const { colors } = useTheme();

  return (
    <View className="mb-6">
      <Text variant="heading" className="mb-3">
        Quick Actions
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingRight: 8 }}
      >
        {quickActions.map((action, index) => (
          <ActionChip
            key={action.id}
            index={index}
            icon={action.icon}
            label={action.label}
            color={action.color}
            cardBg={colors.card}
            border={colors.border}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onAction(action.id);
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function ActionChip({
  index,
  icon,
  label,
  color,
  cardBg,
  border,
  onPress,
}: {
  index: number;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
  cardBg: string;
  border: string;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInRight.delay(index * 60).springify()}>
      <AnimatedPressable
        onPress={onPress}
        onPressIn={() => {
          scale.value = withSpring(0.9, { damping: 12 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 12 });
        }}
        style={[
          style,
          {
            backgroundColor: cardBg,
            borderWidth: 1,
            borderColor: border,
            borderRadius: 20,
            paddingVertical: 16,
            paddingHorizontal: 20,
            alignItems: 'center',
            minWidth: 88,
          },
        ]}
      >
        <View
          className="w-12 h-12 rounded-2xl items-center justify-center mb-2"
          style={{ backgroundColor: `${color}22` }}
        >
          <Ionicons name={icon} size={24} color={color} />
        </View>
        <Text className="text-sm font-semibold">{label}</Text>
      </AnimatedPressable>
    </Animated.View>
  );
}
