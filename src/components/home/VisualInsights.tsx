import { Alert, Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

import { Card } from '@/src/components/ui/Card';
import { Text } from '@/src/components/ui/Text';
import { funnelMetrics, liveFigures, portfolioMix } from '@/src/data/mockDashboard';
import { useTheme } from '@/src/hooks/useTheme';

export function VisualInsights() {
  const { colors } = useTheme();
  const maxFunnel = Math.max(...funnelMetrics.map((item) => item.value));

  const openDetail = (title: string, message: string) => {
    Haptics.selectionAsync();
    Alert.alert(title, message);
  };

  return (
    <View className="mb-6">
      <View className="flex-row items-center justify-between mb-3">
        <Text variant="heading">Visual Command Center</Text>
        <Pressable
          onPress={() =>
            openDetail(
              'NexaPulse AI',
              'Your revenue, funnel, and portfolio signals are ready to connect with a live API.'
            )
          }
        >
          <Text style={{ color: colors.tint }} className="text-sm font-semibold">
            Insights
          </Text>
        </Pressable>
      </View>

      <Card delay={250} className="mb-4">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text variant="caption" secondary>
              Portfolio Mix
            </Text>
            <Text variant="heading" className="mt-1">
              $48.2k allocated
            </Text>
          </View>
          <Pressable
            onPress={() =>
              openDetail('Portfolio Mix', 'Core is leading at 44%, with Growth adding 28%.')
            }
            className="w-10 h-10 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${colors.tint}16` }}
          >
            <Ionicons name="pie-chart" size={21} color={colors.tint} />
          </Pressable>
        </View>

        <View className="flex-row overflow-hidden rounded-lg mb-4" style={{ height: 18 }}>
          {portfolioMix.map((item) => (
            <Pressable
              key={item.id}
              onPress={() =>
                openDetail(item.label, `${item.label} owns ${item.value}% of revenue: ${item.amount}.`)
              }
              style={{ flex: item.value, backgroundColor: item.color }}
            />
          ))}
        </View>

        <View className="flex-row flex-wrap gap-3">
          {portfolioMix.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInRight.delay(index * 50).springify()}
              className="flex-row items-center"
              style={{ width: '47%' }}
            >
              <View
                className="w-2.5 h-2.5 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              />
              <Pressable
                onPress={() =>
                  openDetail(item.label, `${item.amount} from ${item.value}% contribution.`)
                }
              >
                <Text className="text-sm font-semibold">{item.label}</Text>
                <Text variant="caption" secondary>
                  {item.value}% / {item.amount}
                </Text>
              </Pressable>
            </Animated.View>
          ))}
        </View>
      </Card>

      <Card delay={320} className="mb-4">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text variant="caption" secondary>
              Conversion Funnel
            </Text>
            <Text variant="heading" className="mt-1">
              918 repeat buyers
            </Text>
          </View>
          <Ionicons name="funnel" size={22} color={colors.tint} />
        </View>

        {funnelMetrics.map((item, index) => {
          const width = `${Math.max((item.value / maxFunnel) * 100, 18)}%`;
          return (
            <Pressable
              key={item.id}
              onPress={() =>
                openDetail(item.label, `${item.value.toLocaleString()} users at ${item.rate}.`)
              }
              className="mb-3"
            >
              <View className="flex-row justify-between mb-1">
                <Text className="text-sm font-semibold">{item.label}</Text>
                <Text variant="caption" secondary>
                  {item.value.toLocaleString()} / {item.rate}
                </Text>
              </View>
              <Animated.View entering={FadeInDown.delay(index * 60).springify()}>
                <View
                  className="rounded-lg"
                  style={{
                    width: width as `${number}%`,
                    height: 14,
                    backgroundColor: item.color,
                  }}
                />
              </Animated.View>
            </Pressable>
          );
        })}
      </Card>

      <View className="flex-row gap-3">
        {liveFigures.map((item, index) => (
          <Animated.View
            key={item.id}
            entering={FadeInDown.delay(360 + index * 50).springify()}
            style={{ flex: 1 }}
          >
            <Pressable
              onPress={() => openDetail(item.label, `${item.value}: ${item.detail}`)}
              className="rounded-lg p-3"
              style={{
                backgroundColor: colors.card,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Ionicons name={item.icon} size={20} color={colors.tint} />
              <Text className="text-lg font-bold mt-2">{item.value}</Text>
              <Text variant="caption" secondary numberOfLines={1}>
                {item.label}
              </Text>
            </Pressable>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}
