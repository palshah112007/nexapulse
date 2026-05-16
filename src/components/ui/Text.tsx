import { Text as RNText, TextProps as RNTextProps } from 'react-native';

import { useTheme } from '@/src/hooks/useTheme';

type Variant = 'title' | 'heading' | 'body' | 'caption' | 'label';

interface TextProps extends RNTextProps {
  variant?: Variant;
  secondary?: boolean;
}

const variantStyles: Record<Variant, string> = {
  title: 'text-3xl font-bold',
  heading: 'text-xl font-semibold',
  body: 'text-base',
  caption: 'text-sm',
  label: 'text-xs font-medium uppercase tracking-wide',
};

export function Text({ variant = 'body', secondary, className, style, ...props }: TextProps) {
  const { colors } = useTheme();

  return (
    <RNText
      className={`${variantStyles[variant]} ${className ?? ''}`}
      style={[{ color: secondary ? colors.textSecondary : colors.text }, style]}
      {...props}
    />
  );
}
