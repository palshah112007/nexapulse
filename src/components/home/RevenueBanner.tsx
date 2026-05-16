import { Pressable, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { AnimatedCounter } from '@/src/components/home/AnimatedCounter';
import { Text } from '@/src/components/ui/Text';
import { Period, periodRevenue } from '@/src/data/mockDashboard';
import { useTheme } from '@/src/hooks/useTheme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface RevenueBannerProps {
  period: Period;
  onPress?: () => void;
}

export function RevenueBanner({ period, onPress }: RevenueBannerProps) {
  const { colors } = useTheme();
  const data = periodRevenue[period];
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View entering={FadeIn.duration(300)} key={period}>
      <AnimatedPressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          onPress?.();
        }}
        onPressIn={() => {
          scale.value = withSpring(0.98, { damping: 15 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 15 });
        }}
        style={animatedStyle}
      >
        <LinearGradient
          colors={[...colors.gradient]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 24, padding: 20 }}
        >
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <Text style={{ color: 'rgba(255,255,255,0.8)' }} className="text-sm font-medium">
                Total Revenue / {data.label}
              </Text>
              <AnimatedCounter
                key={`${period}-${data.amount}`}
                value={data.amount}
                prefix="$"
                style={{ color: '#fff', fontSize: 36, fontWeight: '800', marginTop: 4 }}
              />
            </View>
            <View className="w-11 h-11 rounded-full bg-white/20 items-center justify-center">
              <Ionicons name="chevron-forward" size={22} color="#fff" />
            </View>
          </View>

          <View className="flex-row mt-4 gap-2">
            <View className="bg-white/20 px-3 py-1.5 rounded-full flex-row items-center">
              <Ionicons name="trending-up" size={14} color="#fff" />
              <Text style={{ color: '#fff' }} className="text-sm font-semibold ml-1">
                +{data.change}%
              </Text>
            </View>
            <View className="bg-white/15 px-3 py-1.5 rounded-full">
              <Text style={{ color: 'rgba(255,255,255,0.9)' }} className="text-sm">
                Tap for details
              </Text>
            </View>
          </View>
        </LinearGradient>
      </AnimatedPressable>
    </Animated.View>
  );
}
