import { useState } from 'react';
import { View, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { AuthHeader } from '@/src/components/auth/AuthHeader';
import { Button, Input, Screen, Text } from '@/src/components/ui';
import { useAuth } from '@/src/hooks/useAuth';
import { useTheme } from '@/src/hooks/useTheme';

export default function RegisterScreen() {
  const { signUp } = useAuth();
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError('');
    if (!name.trim() || !email.trim() || password.length < 6) {
      setError('Fill all fields. Password must be 6+ characters.');
      return;
    }
    setLoading(true);
    try {
      await signUp(email.trim(), password, name.trim());
      router.replace('/(tabs)');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Registration failed');
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
          title="Create account"
          subtitle="Join Premium and start your journey"
        />

        <Animated.View entering={FadeInUp.delay(100).springify()} className="gap-4">
          <Input
            label="Full name"
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            leftIcon="person-outline"
          />
          <Input
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon="mail-outline"
          />
          <Input
            label="Password"
            placeholder="Min. 6 characters"
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

          <Button title="Create Account" onPress={handleRegister} loading={loading} className="mt-2" />

          <View className="flex-row justify-center mt-6">
            <Text secondary>Already have an account? </Text>
            <Link href="/(auth)/login" asChild>
              <Pressable>
                <Text style={{ color: colors.tint }} className="font-semibold">
                  Sign in
                </Text>
              </Pressable>
            </Link>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
