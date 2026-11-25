import type { ReactNode } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MigrationGate } from './core/db/MigrationGate';
import { SnackbarHost } from './core/ui/components/snackbar/SnackbarHost';

// All app-wide context providers live here. Add new ones in this file.
export function Providers({ children }: { children: ReactNode }) {
  return (
    <SafeAreaProvider>
      <JotaiProvider>
        <MigrationGate>{children}</MigrationGate>
        {/* Outside the gate so errors can show even if migrations fail. */}
        <SnackbarHost />
      </JotaiProvider>
    </SafeAreaProvider>
  );
}
