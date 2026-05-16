import { Image, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useTheme } from '@/src/hooks/useTheme';

interface AvatarProps {
  name: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizes = { sm: 36, md: 48, lg: 64, xl: 96 };
const fontSizes = { sm: 14, md: 18, lg: 24, xl: 36 };

export function Avatar({ name, imageUrl, size = 'md' }: AvatarProps) {
  const { colors } = useTheme();
  const dimension = sizes[size];
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (imageUrl) {
    return (
      <Image
        source={{ uri: imageUrl }}
        style={{ width: dimension, height: dimension, borderRadius: dimension / 2 }}
      />
    );
  }

  return (
    <LinearGradient
      colors={[...colors.gradient]}
      style={{
        width: dimension,
        height: dimension,
        borderRadius: dimension / 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: '#fff', fontSize: fontSizes[size], fontWeight: '700' }}>
        {initials}
      </Text>
    </LinearGradient>
  );
}
