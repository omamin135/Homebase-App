// Metro's require.context, used by Expo Router's custom entry (src/App.tsx).
interface NodeRequire {
  context(path: string, deep?: boolean, filter?: RegExp, mode?: string): any;
}

// Drizzle migrations import .sql files as strings (babel-plugin-inline-import).
declare module '*.sql' {
  const content: string;
  export default content;
}
