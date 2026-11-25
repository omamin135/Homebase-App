import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';
import * as schema from './schema';

const sqlite = openDatabaseSync('homebase.db');

// Only repository implementations should import this.
export const db = drizzle(sqlite, { schema });
