import { useCallback, useState } from 'react';
import { Alert, Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

import { ActivityRow } from '@/src/components/home/ActivityRow';
import { MiniChart } from '@/src/components/home/MiniChart';
import { PeriodSelector } from '@/src/components/home/PeriodSelector';
import { QuickActions } from '@/src/components/home/QuickActions';
import { RevenueBanner } from '@/src/components/home/RevenueBanner';
import { StatCard } from '@/src/components/home/StatCard';
import { VisualInsights } from '@/src/components/home/VisualInsights';
import { Avatar, Card, Screen, Text } from '@/src/components/ui';
import {
  mockActivity,
  Period,
  periodRevenue,
  statsByPeriod,
} from '@/src/data/mockDashboard';
import { useAuth } from '@/src/hooks/useAuth';
import { useTheme } from '@/src/hooks/useTheme';

export default function HomeScreen() {
  const { user } = useAuth();
  const { colors } = useTheme();
  const [period, setPeriod] = useState<Period>('month');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStatId, setSelectedStatId] = useState<string | null>(null);
  const [selectedBarIndex, setSelectedBarIndex] = useState<number | null>(null);
  const [expandedActivityId, setExpandedActivityId] = useState<string | null>(null);

  const stats = statsByPeriod[period];
  const greeting = getGreeting();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await new Promise((r) => setTimeout(r, 1200));
    setRefreshing(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  const handlePeriodChange = (p: Period) => {
    setPeriod(p);
    setSelectedStatId(null);
    setSelectedBarIndex(null);
  };

  const handleQuickAction = (id: string) => {
    const labels: Record<string, string> = {
      add: 'Create new item',
      analytics: 'Analytics',
      invoice: 'New invoice',
      share: 'Share report',
    };
    Alert.alert(labels[id] ?? 'Action', 'This feature can be connected to your API.');
  };

  return (
    <Screen refreshing={refreshing} onRefresh={onRefresh}>
      <Animated.View entering={FadeInDown.springify()} className="pt-2 pb-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text variant="caption" secondary>
              NexaPulse / {greeting}
            </Text>
            <Text variant="title" className="mt-1">
              {user?.displayName ?? 'Guest'}
            </Text>
          </View>
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              Alert.alert('Notifications', 'You have 3 unread notifications.');
            }}
            className="mr-3 relative"
          >
            <View
              className="w-11 h-11 rounded-full items-center justify-center"
              style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}
            >
              <Ionicons name="notifications-outline" size={22} color={colors.text} />
            </View>
            <View
              className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: colors.danger }}
            />
          </Pressable>
          <Avatar name={user?.displayName ?? 'G'} imageUrl={user?.photoURL} size="md" />
        </View>
      </Animated.View>

      <View className="mb-4">
        <PeriodSelector value={period} onChange={handlePeriodChange} />
      </View>

      <View className="mb-6">
        <RevenueBanner
          period={period}
          onPress={() => {
            const data = periodRevenue[period];
            Alert.alert(
              'Revenue Details',
              `${data.label}: $${data.amount.toLocaleString()}\nGrowth: +${data.change}%`
            );
          }}
        />
      </View>

      <QuickActions onAction={handleQuickAction} />

      <MiniChart
        period={period}
        selectedIndex={selectedBarIndex}
        onSelectBar={setSelectedBarIndex}
      />

      <VisualInsights />

      <View className="flex-row items-center justify-between mb-4">
        <Text variant="heading">Overview</Text>
        {selectedStatId && (
          <Animated.View entering={FadeInRight}>
            <Pressable onPress={() => setSelectedStatId(null)}>
              <Text style={{ color: colors.tint }} className="text-sm font-medium">
                Clear
              </Text>
            </Pressable>
          </Animated.View>
        )}
      </View>

      <View className="flex-row flex-wrap gap-3 mb-8">
        {stats.map((stat, i) => (
          <StatCard
            key={`${period}-${stat.id}`}
            stat={stat}
            index={i}
            selected={selectedStatId === stat.id}
            onPress={() =>
              setSelectedStatId((prev) => (prev === stat.id ? null : stat.id))
            }
          />
        ))}
      </View>

      <Text variant="heading" className="mb-3">
        Recent Activity
      </Text>
      <Text variant="caption" secondary className="mb-3">
        Tap any item to expand
      </Text>
      <Card delay={400} noPadding>
        {mockActivity.map((item, i) => (
          <View key={item.id} className="px-4">
            <ActivityRow
              item={item}
              isLast={i === mockActivity.length - 1}
              expanded={expandedActivityId === item.id}
              onPress={() =>
                setExpandedActivityId((prev) => (prev === item.id ? null : item.id))
              }
            />
          </View>
        ))}
      </Card>
    </Screen>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}
