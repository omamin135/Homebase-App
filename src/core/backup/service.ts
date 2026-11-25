// Plain TypeScript: no React, Expo or database imports.
import type { BackupRepository } from './repository';

export type BackupExport = {
  fileName: string;
  bytes: Uint8Array;
  schemaVersion: number;
};

const pad = (n: number) => String(n).padStart(2, '0');

export function backupFileName(date: Date): string {
  const d = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const t = `${pad(date.getHours())}${pad(date.getMinutes())}`;
  return `homebase-backup-${d}-${t}.db`;
}

export function createBackupService(repo: BackupRepository, now: () => Date = () => new Date()) {
  return {
    /** Stamps the schema version into the database, then snapshots it. */
    async createExport(): Promise<BackupExport> {
      const schemaVersion = repo.getSchemaVersion();
      await repo.saveSchemaVersion(schemaVersion);
      return {
        fileName: backupFileName(now()),
        bytes: repo.serializeDatabase(),
        schemaVersion,
      };
    },
  };
}
