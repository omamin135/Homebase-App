import type { ReactNode } from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../../theme';
import { AppText } from './AppText';

type Props = { title?: string; children: ReactNode };

// Scrolling page with safe-area padding, neutral background and optional title.
export function Screen({ title, children }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.neutral.background }}
      contentContainerStyle={{
        paddingTop: insets.top + spacing.xl,
        paddingBottom: insets.bottom + spacing.xl,
        paddingHorizontal: spacing.lg,
        gap: spacing.md,
      }}
    >
      {title ? (
        <AppText variant="screenTitle" style={{ marginBottom: spacing.sm }}>
          {title}
        </AppText>
      ) : null}
      {children}
    </ScrollView>
  );
}
