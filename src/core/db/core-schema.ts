import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { baseColumns } from './base-columns';

// Small key/value store for app-level settings (e.g. schema version for backups).
export const coreSetting = sqliteTable('Core_Setting', {
  ...baseColumns,
  settingKey: text('SettingKey').notNull().unique(),
  settingValue: text('SettingValue'),
});
