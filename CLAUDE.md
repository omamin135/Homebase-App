# Homebase

Personal Android life-management app: a dashboard plus self-contained modules (checklist, shopping list, recipes, contacts, etc.). Expo + React Native + TypeScript, SQLite via Drizzle, Jotai for UI state. Local-first, single user, with a possible backend later.

## Read the spec first

@claude_docs/SPEC.md is the source of truth for architecture, data conventions, tech stack and build order. Read it before making design decisions. All documentation for Claude lives in `claude_docs/`.

## Read the UI design system for any UI work

@claude_docs/design_system/UI_Design_System.md holds the design tokens (neutral palette, per-module accent colors), typography, component rules and React Native token structure. Follow it for all UI work. Never hardcode hex values in screens: use the central token file.

`claude_docs/design_system/Intial_Design_Reference.jpg` is a rough style reference only (overall feel, card shapes, spacing, chart and nav styling). It is not a layout to copy, and its colors are not the app's palette. The tokens in the design document always win.

## Read the components guide before building features

@claude_docs/COMPONENTS.md lists the reusable components (`Screen`, `Card`, `Button`, `AppText`, snackbar) with usage rules such as how to surface errors and confirmations. Follow it instead of re-creating their behavior or styling.

## Keeping the design system up to date

Update `claude_docs/design_system/UI_Design_System.md` whenever a design decision is made or changed: new or adjusted colors, typography, spacing, component styles, navigation patterns, or dark mode tokens. If code and the document disagree, resolve it and fix whichever is out of date. Keep it as a record of the design system itself, not a log of screens built.

## Keeping the spec up to date

Update `claude_docs/SPEC.md` when you make or change an architectural decision or learn something that affects how the whole app is built. Examples:

- A change to the tech stack, layers or folder structure
- A new data or naming convention
- A pattern that every module should follow
- A decision made on one of the spec's open decisions

Do not put routine work in the spec. Leave out feature progress, task lists, per-module implementation status, bug fixes and session notes. If a change only affects one module's internals, it doesn't belong there. Keep the spec short and current.

## Working rules

- Use npm only. Use `npx expo install <package>` for Expo-related packages.
- Build one module at a time, end to end, before starting the next.
- UI never touches SQL or Drizzle. Go through repositories.
- Business logic lives in plain TypeScript services with no React or database imports.
- Every table has `Id`, `CreateDate` and `ModifiedDate`. All table and column names are PascalCase.
- Jotai atoms hold UI state only. The database is the source of truth.
- Style components inline (`style={{ ... }}`) using theme tokens. Do not use `StyleSheet.create`. Reuse the shared components in `src/core/ui/components/` before writing new styling.
- Whenever you add, change or remove a shared component in `src/core/ui/components/`, update `claude_docs/COMPONENTS.md` in the same change.
- Entry chain is `index.ts` -> `src/App.tsx` -> `src/Providers.tsx`. Add new context providers in `Providers.tsx`.
- Before finishing a change, run `npm run typecheck` and `npm run lint` and fix what they report. Lint enforces the layer boundaries (see the spec's "Layers" section); never disable a boundary rule to make code pass. Fix the import instead.
