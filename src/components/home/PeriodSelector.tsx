import { Pressable, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Text } from '@/src/components/ui/Text';
import { Period } from '@/src/data/mockDashboard';
import { useTheme } from '@/src/hooks/useTheme';

const periods: { key: Period; label: string }[] = [
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: 'year', label: 'Year' },
];

interface PeriodSelectorProps {
  value: Period;
  onChange: (period: Period) => void;
}

export function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  const { colors } = useTheme();

  return (
    <View
      className="flex-row p-1 rounded-2xl"
      style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}
    >
      {periods.map((p) => {
        const active = value === p.key;
        return (
          <Pressable
            key={p.key}
            onPress={() => {
              Haptics.selectionAsync();
              onChange(p.key);
            }}
            className="flex-1 py-2.5 rounded-xl items-center"
            style={active ? { backgroundColor: colors.tint } : undefined}
          >
            <Text
              className="text-sm font-semibold"
              style={{ color: active ? '#fff' : colors.textSecondary }}
            >
              {p.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
