// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

// ---------------------------------------------------------------------------
// Layer boundaries (see claude_docs/SPEC.md "Layers").
// Each group lists imports a file in that layer must not use. ESLint applies
// only the LAST matching block for a rule, so every block below spells out the
// full set of restrictions for its files. Type-only imports (`import type`)
// are always allowed, so services can reference repository interfaces.
// ---------------------------------------------------------------------------

// Services and types must stay plain TypeScript so they can move to a server.
const noFrameworks = [
  {
    group: ['react', 'react-*', 'react-native', 'react-native-*', 'expo', 'expo-*', '@expo/*', 'jotai', 'jotai/*'],
    message: 'Services and types are plain TypeScript: no React, React Native, Expo or Jotai imports.',
  },
];

// Only repositories (and hooks that wire them up) may reach the database.
const noDatabase = [
  {
    group: ['drizzle-orm', 'drizzle-orm/*', 'expo-sqlite', '**/db/client', '**/db/schema', '**/repository'],
    message: 'Go through a hook (UI) or a repository interface (services). Only repositories touch the database.',
  },
];

// Core is shared by every module and must not depend on any of them.
const noModules = [
  {
    group: ['**/modules/**'],
    message: 'Core must not import from modules. Modules depend on core, never the reverse.',
  },
];

const restrict = (...sets) => ({
  '@typescript-eslint/no-restricted-imports': [
    'error',
    { patterns: sets.flat().map((p) => ({ ...p, allowTypeImports: true })) },
  ],
});

const TS = '**/*.{ts,tsx}';

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*', 'drizzle/*'],
  },

  // Core never imports modules.
  { files: [`src/core/${TS}`], rules: restrict(noModules) },

  // UI: screens, components and routes never touch the database.
  { files: [`app/${TS}`, `src/modules/*/screens/${TS}`, `src/modules/*/components/${TS}`], rules: restrict(noDatabase) },
  { files: [`src/core/ui/${TS}`], rules: restrict(noDatabase, noModules) },

  // Services and types: plain TypeScript, no database access.
  { files: ['src/modules/*/service.ts', 'src/modules/*/types.ts'], rules: restrict(noFrameworks, noDatabase) },
  { files: ['src/core/*/service.ts', 'src/core/*/types.ts'], rules: restrict(noFrameworks, noDatabase, noModules) },
]);
