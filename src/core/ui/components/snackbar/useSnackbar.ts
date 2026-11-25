import { atom, useSetAtom } from 'jotai';
import { useCallback } from 'react';

export type SnackbarVariant = 'error' | 'success';
export type SnackbarMessage = { id: number; message: string; variant: SnackbarVariant };

// UI state only: the message currently shown (or null). Read by SnackbarHost.
export const snackbarAtom = atom<SnackbarMessage | null>(null);

let nextId = 1;

// Call showError / showSuccess from any component or hook below <Providers>.
// A new message replaces the one currently showing and restarts the timer.
export function useSnackbar() {
  const set = useSetAtom(snackbarAtom);
  const show = useCallback(
    (message: string, variant: SnackbarVariant) => set({ id: nextId++, message, variant }),
    [set],
  );
  const showError = useCallback((message: string) => show(message, 'error'), [show]);
  const showSuccess = useCallback((message: string) => show(message, 'success'), [show]);
  const dismiss = useCallback(() => set(null), [set]);
  return { showError, showSuccess, dismiss };
}
