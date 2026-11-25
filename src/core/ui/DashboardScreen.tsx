import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moduleRegistry } from '../module-registry';
import { colors, radius, spacing, typography } from '../theme';

export function DashboardScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{
        paddingTop: insets.top + spacing.xl,
        paddingBottom: insets.bottom + spacing.xl,
        paddingHorizontal: spacing.lg,
        gap: spacing.md,
      }}
    >
      <Text style={styles.title}>Homebase</Text>

      {moduleRegistry.length === 0 ? (
        <View style={styles.card}>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>No modules yet</Text>
            <Text style={styles.supporting}>
              Modules register themselves in the module registry and appear here.
            </Text>
          </View>
        </View>
      ) : (
        moduleRegistry.map((m) => {
          const theme = colors.modules[m.theme];
          return (
            <Link key={m.id} href={m.route} asChild>
              <Pressable style={styles.card}>
                <View style={[styles.well, { backgroundColor: theme.container }]}>
                  <View style={[styles.dot, { backgroundColor: theme.primary }]} />
                </View>
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>{m.name}</Text>
                  {m.description ? <Text style={styles.supporting}>{m.description}</Text> : null}
                </View>
              </Pressable>
            </Link>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.neutral.background },
  title: { ...typography.screenTitle, color: colors.neutral.text, marginBottom: spacing.sm },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },
  cardText: { flex: 1 },
  cardTitle: { ...typography.sectionHeading, color: colors.neutral.text },
  supporting: { ...typography.supporting, color: colors.neutral.textSecondary },
  well: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: { width: 14, height: 14, borderRadius: radius.pill },
});
