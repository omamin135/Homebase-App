import { text } from 'drizzle-orm/sqlite-core';

// Spread into every table so none can miss the required columns.
// TS properties are camelCase; database column names are PascalCase.
export const baseColumns = {
  id: text('Id').primaryKey(),
  createDate: text('CreateDate').notNull(),
  modifiedDate: text('ModifiedDate').notNull(),
  deletedDate: text('DeletedDate'),
};
