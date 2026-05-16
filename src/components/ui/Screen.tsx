import { RefreshControl, ScrollView, View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { useTheme } from '@/src/hooks/useTheme';

interface ScreenProps extends ViewProps {
  scroll?: boolean;
  padded?: boolean;
  safeTop?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function Screen({
  children,
  scroll = true,
  padded = true,
  safeTop = true,
  refreshing = false,
  onRefresh,
  className,
  style,
  ...props
}: ScreenProps) {
  const { colors, resolvedTheme } = useTheme();

  const content = (
    <View
      className={`flex-1 ${padded ? 'px-5' : ''} ${className ?? ''}`}
      style={[{ backgroundColor: colors.background }, style]}
      {...props}
    >
      {children}
    </View>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={safeTop ? ['top'] : []}
    >
      <StatusBar style={resolvedTheme === 'dark' ? 'light' : 'dark'} />
      {scroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            onRefresh ? (
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={colors.tint}
                colors={[colors.tint]}
              />
            ) : undefined
          }
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}
