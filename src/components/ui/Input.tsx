import { useState } from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  Pressable,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/src/hooks/useTheme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
}

export function Input({
  label,
  error,
  leftIcon,
  isPassword,
  className,
  style,
  ...props
}: InputProps) {
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-full">
      {label && (
        <Text
          className="text-sm font-medium mb-2"
          style={{ color: colors.textSecondary }}
        >
          {label}
        </Text>
      )}
      <View
        className="flex-row items-center rounded-2xl px-4 border"
        style={{
          backgroundColor: colors.card,
          borderColor: error ? colors.danger : isFocused ? colors.tint : colors.border,
          borderWidth: isFocused || error ? 2 : 1,
        }}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={isFocused ? colors.tint : colors.textSecondary}
            style={{ marginRight: 12 }}
          />
        )}
        <TextInput
          className={`flex-1 py-4 text-base ${className ?? ''}`}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[{ color: colors.text }, style]}
          {...props}
        />
        {isPassword && (
          <Pressable onPress={() => setShowPassword(!showPassword)} hitSlop={8}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={colors.textSecondary}
            />
          </Pressable>
        )}
      </View>
      {error && (
        <Text className="text-sm mt-1.5" style={{ color: colors.danger }}>
          {error}
        </Text>
      )}
    </View>
  );
}
