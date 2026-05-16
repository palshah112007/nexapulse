import { useState } from 'react';
import { View, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { AuthHeader } from '@/src/components/auth/AuthHeader';
import { Button, Input, Screen, Text } from '@/src/components/ui';
import { useAuth } from '@/src/hooks/useAuth';
import { useTheme } from '@/src/hooks/useTheme';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    if (!email.trim() || !password) {
      setError('Please enter email and password');
      return;
    }
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      router.replace('/(tabs)');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await signIn('demo@nexapulse.app', 'password123');
      router.replace('/(tabs)');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Demo sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 pt-4"
      >
        <AuthHeader
          title="Welcome back"
          subtitle="Sign in to continue to your dashboard"
        />

        <Animated.View entering={FadeInUp.delay(100).springify()} className="gap-4">
          <Input
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            leftIcon="mail-outline"
          />
          <Input
            label="Password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            isPassword
            leftIcon="lock-closed-outline"
          />
          {error ? (
            <Text variant="caption" style={{ color: colors.danger }}>
              {error}
            </Text>
          ) : null}

          <Pressable onPress={() => router.push('/(auth)/forgot-password')} className="self-end">
            <Text style={{ color: colors.tint }} className="font-medium">
              Forgot password?
            </Text>
          </Pressable>

          <Button title="Sign In" onPress={handleLogin} loading={loading} className="mt-2" />
          <Button
            title="Try Demo Dashboard"
            variant="secondary"
            onPress={handleDemoLogin}
            disabled={loading}
          />

          <View className="flex-row justify-center mt-6">
            <Text secondary>Don&apos;t have an account? </Text>
            <Link href="/(auth)/register" asChild>
              <Pressable>
                <Text style={{ color: colors.tint }} className="font-semibold">
                  Sign up
                </Text>
              </Pressable>
            </Link>
          </View>

          <Text variant="caption" secondary className="text-center mt-4">
            Demo mode: use any email and password (6+ chars) without Firebase configured
          </Text>
        </Animated.View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
