import { useState } from 'react';
import { Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { AuthHeader } from '@/src/components/auth/AuthHeader';
import { Button, Input, Screen, Text } from '@/src/components/ui';
import { useAuth } from '@/src/hooks/useAuth';
import { useTheme } from '@/src/hooks/useTheme';

export default function ForgotPasswordScreen() {
  const { resetPassword } = useAuth();
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setError('');
    setSuccess(false);
    if (!email.trim()) {
      setError('Enter your email address');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(email.trim());
      setSuccess(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <Pressable onPress={() => router.back()} className="flex-row items-center mb-4 pt-2">
        <Ionicons name="chevron-back" size={24} color={colors.tint} />
        <Text style={{ color: colors.tint }} className="font-medium ml-1">
          Back
        </Text>
      </Pressable>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <AuthHeader
          title="Reset password"
          subtitle="We'll send you a link to reset your password"
        />

        <Animated.View entering={FadeInUp.delay(100).springify()} className="gap-4">
          <Input
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon="mail-outline"
          />
          {error ? (
            <Text variant="caption" style={{ color: colors.danger }}>
              {error}
            </Text>
          ) : null}
          {success ? (
            <Text variant="caption" style={{ color: colors.success }}>
              Reset link sent! Check your inbox.
            </Text>
          ) : null}

          <Button title="Send Reset Link" onPress={handleReset} loading={loading} className="mt-2" />
        </Animated.View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
