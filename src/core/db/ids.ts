import { randomUUID } from 'expo-crypto';

export const newId = (): string => randomUUID();
export const nowIso = (): string => new Date().toISOString();

// Base column values for a new row. Repositories use this on insert and set
// modifiedDate again on every update.
export const newRowBase = () => {
  const now = nowIso();
  return { id: newId(), createDate: now, modifiedDate: now, deletedDate: null };
};
