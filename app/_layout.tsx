import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider as JotaiProvider } from 'jotai';
import { MigrationGate } from '../src/core/db/MigrationGate';
import { colors } from '../src/core/theme';

export default function RootLayout() {
  return (
    <JotaiProvider>
      <MigrationGate>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.neutral.background },
          }}
        />
      </MigrationGate>
    </JotaiProvider>
  );
}
