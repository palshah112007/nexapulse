import { Pressable, View, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { Text } from '@/src/components/ui/Text';
import { useTheme } from '@/src/hooks/useTheme';

interface SettingsRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  onPress?: () => void;
  showChevron?: boolean;
  toggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (value: boolean) => void;
  destructive?: boolean;
  isLast?: boolean;
}

export function SettingsRow({
  icon,
  label,
  value,
  onPress,
  showChevron = true,
  toggle,
  toggleValue,
  onToggle,
  destructive,
  isLast,
}: SettingsRowProps) {
  const { colors } = useTheme();
  const accentColor = destructive ? colors.danger : colors.tint;

  const handlePress = () => {
    if (toggle) return;
    Haptics.selectionAsync();
    onPress?.();
  };

  return (
    <Pressable
      onPress={handlePress}
      className="flex-row items-center py-4 px-4"
      style={{
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: colors.border,
      }}
    >
      <View
        className="w-9 h-9 rounded-lg items-center justify-center mr-3"
        style={{ backgroundColor: `${accentColor}18` }}
      >
        <Ionicons name={icon} size={20} color={accentColor} />
      </View>
      <Text className="flex-1 font-medium" style={destructive ? { color: colors.danger } : undefined}>
        {label}
      </Text>
      {value && (
        <Text variant="caption" secondary className="mr-2">
          {value}
        </Text>
      )}
      {toggle && onToggle !== undefined && (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          trackColor={{ false: colors.border, true: colors.tint }}
        />
      )}
      {showChevron && !toggle && (
        <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
      )}
    </Pressable>
  );
}
