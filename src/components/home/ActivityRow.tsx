import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Text } from '@/src/components/ui/Text';
import { useTheme } from '@/src/hooks/useTheme';
import { ActivityItem } from '@/src/types';

const typeConfig = {
  success: { icon: 'checkmark-circle' as const, colorKey: 'success' as const },
  info: { icon: 'information-circle' as const, colorKey: 'tint' as const },
  warning: { icon: 'warning' as const, colorKey: 'danger' as const },
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ActivityRowProps {
  item: ActivityItem;
  isLast?: boolean;
  expanded?: boolean;
  onPress?: () => void;
}

export function ActivityRow({ item, isLast, expanded, onPress }: ActivityRowProps) {
  const { colors } = useTheme();
  const config = typeConfig[item.type];
  const iconColor = config.colorKey === 'tint' ? colors.tint : colors[config.colorKey];
  const scale = useSharedValue(1);

  const rowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: expanded ? `${colors.tint}08` : 'transparent',
  }));

  return (
    <AnimatedPressable
      onPress={() => {
        Haptics.selectionAsync();
        onPress?.();
      }}
      onPressIn={() => {
        scale.value = withSpring(0.98, { damping: 15 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 15 });
      }}
      style={[
        rowStyle,
        {
          borderBottomWidth: isLast && !expanded ? 0 : 1,
          borderBottomColor: colors.border,
          borderRadius: expanded ? 12 : 0,
          paddingHorizontal: expanded ? 8 : 0,
        },
      ]}
    >
      <View className="flex-row items-center py-4">
        <View
          className="w-10 h-10 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: `${iconColor}18` }}
        >
          <Ionicons name={config.icon} size={22} color={iconColor} />
        </View>
        <View className="flex-1">
          <Text className="font-semibold">{item.title}</Text>
          <Text variant="caption" secondary>
            {item.subtitle}
          </Text>
        </View>
        <View className="items-end">
          <Text variant="caption" secondary>
            {item.time}
          </Text>
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={16}
            color={colors.textSecondary}
            style={{ marginTop: 4 }}
          />
        </View>
      </View>

      {expanded && (
        <Animated.View entering={FadeIn.duration(200)} className="pb-4 px-3">
          <View
            className="p-3 rounded-xl"
            style={{ backgroundColor: colors.background }}
          >
            <Text variant="caption" secondary>
              {getExpandedDetail(item)}
            </Text>
            <Pressable
              className="mt-3 flex-row items-center"
              onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}
            >
              <Ionicons name="open-outline" size={16} color={colors.tint} />
              <Text style={{ color: colors.tint }} className="text-sm font-semibold ml-1">
                View full details
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      )}
    </AnimatedPressable>
  );
}

function getExpandedDetail(item: ActivityItem): string {
  const details: Record<string, string> = {
    '1': 'Customer upgraded to Pro plan. Next billing: Jun 16, 2026.',
    '2': 'Transaction ID #TX-8842. Payment method: Apple Pay.',
    '3': 'CPU peaked at 89%. Auto-scaling triggered. Resolved in 12 min.',
    '4': 'Display name and notification preferences were updated.',
  };
  return details[item.id] ?? item.subtitle;
}
