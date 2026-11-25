import { useEffect, useState } from 'react';
import { Animated, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../../../theme';
import { AppText } from '../AppText';
import type { SnackbarMessage } from './useSnackbar';

const HIDDEN_Y = -240;

type Props = {
  /** Message to show, or null to slide out. A new object restarts the timer. */
  current: SnackbarMessage | null;
  onDismiss: () => void;
  /** Milliseconds before auto-dismiss. */
  duration?: number;
};

const variantStyle = {
  error: { label: 'Error', colors: colors.semantic.danger, tone: 'danger' },
  success: { label: 'Success', colors: colors.semantic.success, tone: 'success' },
} as const;

// Snackbar that slides in from the top. Tap it to dismiss early.
export function Snackbar({ current, onDismiss, duration = 5000 }: Props) {
  const insets = useSafeAreaInsets();
  const [translateY] = useState(() => new Animated.Value(HIDDEN_Y));
  // Keeps the last text on screen while the slide-out animation plays.
  const [shown, setShown] = useState<SnackbarMessage | null>(current);
  // A new message arrived: show it right away (React's "adjust state on prop
  // change" pattern, which avoids setState inside an effect).
  if (current && current !== shown) setShown(current);

  useEffect(() => {
    if (current) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }).start();
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
    Animated.timing(translateY, {
      toValue: HIDDEN_Y,
      duration: 200,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) setShown(null);
    });
  }, [current, duration, onDismiss, translateY]);

  if (!shown) return null;
  const variant = variantStyle[shown.variant];

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: insets.top + spacing.sm,
        left: spacing.lg,
        right: spacing.lg,
        transform: [{ translateY }],
      }}
    >
      <Pressable
        onPress={onDismiss}
        accessibilityRole={shown.variant === 'error' ? 'alert' : 'text'}
        style={{
          padding: spacing.lg,
          gap: spacing.xs,
          backgroundColor: variant.colors.container,
          borderRadius: radius.card,
          borderWidth: 1,
          borderColor: variant.colors.primary,
        }}
      >
        <AppText variant="supporting" tone={variant.tone} style={{ fontWeight: '600' }}>
          {variant.label}
        </AppText>
        <AppText variant="body">{shown.message}</AppText>
      </Pressable>
    </Animated.View>
  );
}
