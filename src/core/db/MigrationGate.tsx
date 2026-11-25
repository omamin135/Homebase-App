import type { ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../../../drizzle/migrations';
import { colors } from '../theme';
import { db } from './client';

// Applies pending migrations at startup and renders children once done.
export function MigrationGate({ children }: { children: ReactNode }) {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Database migration failed</Text>
        <Text style={styles.sub}>{error.message}</Text>
      </View>
    );
  }
  if (!success) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.neutral.textSecondary} />
      </View>
    );
  }
  return <>{children}</>;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.neutral.background,
  },
  text: { color: colors.neutral.text, fontSize: 16, marginBottom: 8 },
  sub: { color: colors.neutral.textSecondary, fontSize: 13, textAlign: 'center' },
});
