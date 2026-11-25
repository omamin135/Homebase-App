import { db, sqlite } from '../db/client';
import { coreSetting } from '../db/core-schema';
import { newRowBase, nowIso } from '../db/ids';
import journal from '../../../drizzle/meta/_journal.json';

export const SCHEMA_VERSION_KEY = 'SchemaVersion';

export interface BackupRepository {
  /** Current schema version = number of applied migrations in this build. */
  getSchemaVersion(): number;
  /** Records the schema version inside the database so an export carries it. */
  saveSchemaVersion(version: number): Promise<void>;
  /** Consistent snapshot of the whole database as raw .db bytes. */
  serializeDatabase(): Uint8Array;
}

export const sqliteBackupRepository: BackupRepository = {
  getSchemaVersion: () => journal.entries.length,

  async saveSchemaVersion(version) {
    const now = nowIso();
    await db
      .insert(coreSetting)
      .values({
        ...newRowBase(),
        settingKey: SCHEMA_VERSION_KEY,
        settingValue: String(version),
      })
      .onConflictDoUpdate({
        target: coreSetting.settingKey,
        set: { settingValue: String(version), modifiedDate: now },
      });
  },

  // serializeSync includes pending WAL content, so the copy is complete.
  serializeDatabase: () => sqlite.serializeSync(),
};
