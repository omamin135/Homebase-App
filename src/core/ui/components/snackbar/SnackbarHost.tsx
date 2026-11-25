import { useAtomValue } from 'jotai';
import { Snackbar } from './Snackbar';
import { snackbarAtom, useSnackbar } from './useSnackbar';

// Mounted once in Providers.tsx. Shows whatever useSnackbar().showError sets.
export function SnackbarHost() {
  const current = useAtomValue(snackbarAtom);
  const { dismiss } = useSnackbar();
  return <Snackbar current={current} onDismiss={dismiss} />;
}
