import { useEffect, type ReactNode } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../../../drizzle/migrations';
import { colors, spacing } from '../theme';
import { AppText } from '../ui/components/AppText';
import { useSnackbar } from '../ui/components/snackbar/useSnackbar';
import { db } from './client';

// Applies pending migrations at startup and renders children once done.
export function MigrationGate({ children }: { children: ReactNode }) {
  const { success, error } = useMigrations(db, migrations);
  const { showError } = useSnackbar();

  useEffect(() => {
    if (error) showError(`Database migration failed: ${error.message}`);
  }, [error, showError]);

  if (success) return <>{children}</>;

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.xl,
        gap: spacing.md,
        backgroundColor: colors.neutral.background.primary,
      }}
    >
      {error ? (
        <AppText variant="supporting" tone="secondary" style={{ textAlign: 'center' }}>
          The app cannot start until the database is ready.
        </AppText>
      ) : (
        <ActivityIndicator color={colors.neutral.text.secondary} />
      )}
    </View>
  );
}
