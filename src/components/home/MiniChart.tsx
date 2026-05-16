import { Pressable, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, {
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Card } from '@/src/components/ui/Card';
import { Text } from '@/src/components/ui/Text';
import { Period, chartDataByPeriod, chartLabelsByPeriod } from '@/src/data/mockDashboard';
import { useTheme } from '@/src/hooks/useTheme';

interface MiniChartProps {
  period: Period;
  selectedIndex: number | null;
  onSelectBar: (index: number | null) => void;
}

export function MiniChart({ period, selectedIndex, onSelectBar }: MiniChartProps) {
  const { colors } = useTheme();
  const rawData = chartDataByPeriod[period];
  const labels =
    period === 'month'
      ? ['W1', 'W2', 'W3', 'W4']
      : chartLabelsByPeriod[period].slice(0, rawData.length);
  const data = period === 'month' ? aggregateMonthly(rawData) : rawData;
  const max = Math.max(...data);

  return (
    <Card delay={200} className="mb-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text variant="heading">Performance</Text>
        {selectedIndex !== null && (
          <Animated.View entering={FadeInUp}>
            <Text style={{ color: colors.tint }} className="font-bold text-lg">
              {data[selectedIndex]}%
            </Text>
          </Animated.View>
        )}
      </View>
      <View className="flex-row items-end justify-between" style={{ height: 120 }}>
        {data.map((value, index) => (
          <ChartBar
            key={`${period}-${index}`}
            value={value}
            max={max}
            label={labels[index] ?? ''}
            index={index}
            selected={selectedIndex === index}
            onPress={() => {
              Haptics.selectionAsync();
              onSelectBar(selectedIndex === index ? null : index);
            }}
            tint={colors.tint}
          />
        ))}
      </View>
    </Card>
  );
}

function aggregateMonthly(data: number[]): number[] {
  const chunk = Math.ceil(data.length / 4);
  const result: number[] = [];
  for (let i = 0; i < 4; i++) {
    const slice = data.slice(i * chunk, (i + 1) * chunk);
    result.push(Math.round(slice.reduce((a, b) => a + b, 0) / slice.length));
  }
  return result;
}

const CHART_HEIGHT = 96;

function ChartBar({
  value,
  max,
  label,
  index,
  selected,
  onPress,
  tint,
}: {
  value: number;
  max: number;
  label: string;
  index: number;
  selected: boolean;
  onPress: () => void;
  tint: string;
}) {
  const barHeight = Math.max((value / max) * CHART_HEIGHT, 8);
  const scale = useSharedValue(1);

  const barStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: scale.value }],
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.92, { damping: 12 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 12 });
      }}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}
    >
      <Animated.View
        entering={FadeInUp.delay(index * 50).springify()}
        style={[
          barStyle,
          {
            width: '70%',
            height: barHeight,
            borderRadius: 8,
            backgroundColor: selected ? tint : `${tint}55`,
            borderWidth: selected ? 2 : 0,
            borderColor: selected ? '#fff' : 'transparent',
          },
        ]}
      />
      <Text variant="caption" secondary className="mt-2 text-xs">
        {label}
      </Text>
    </Pressable>
  );
}
