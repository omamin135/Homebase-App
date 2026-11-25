// Central design tokens. Source of truth: claude_docs/design_system/UI_Design_System.md.
// Screens must read colors from here, never hardcode hex values.

export type ModuleTheme = { primary: string; container: string; subtle: string };

// Candidate accent sets, kept for reference. When a module is built, copy one
// of these into `modules` under the module's key (and delete it here). Not
// used directly by any screen.
export const accentPalette = {
  blue: { primary: '#527DAA', container: '#E0EAF4', subtle: '#F1F5FA' },
  terracotta: { primary: '#BB735E', container: '#F3E3DE', subtle: '#FAF2EF' },
  sage: { primary: '#789477', container: '#E4EDE2', subtle: '#F2F6F0' },
  teal: { primary: '#087F80', container: '#D9EEEE', subtle: '#EFF8F7' },
  lavender: { primary: '#8876AA', container: '#EAE4F3', subtle: '#F5F2F9' },
  green: { primary: '#64866C', container: '#E3ECE4', subtle: '#F2F6F2' },
  rose: { primary: '#C16F7E', container: '#F4E2E6', subtle: '#FBF2F4' },
  amber: { primary: '#C58A36', container: '#F5E9D5', subtle: '#FBF6EC' },
} as const satisfies Record<string, ModuleTheme>;

// One accent set per module, added only when that module is being built.
const modules = {} as const satisfies Record<string, ModuleTheme>;

export const colors = {
  neutral: {
    background: { primary: '#F5F6F4', secondary: '#ECEFEC', tertiary: '#E2E6E3' },
    surface: { primary: '#FFFFFF' },
    text: { primary: '#343A38', secondary: '#858D88' },
    border: { subtle: '#E5E9E6' },
    icon: { muted: '#858D88' },
  },
  semantic: {
    danger: { primary: '#B5483F', container: '#F6E1DE' },
    success: { primary: '#4E8B5F', container: '#E0EFE4' },
  },
  modules,
} as const;

export type ModuleKey = keyof typeof modules;

// Accent set for a module. Use this rather than indexing colors.modules.
export const moduleTheme = (key: ModuleKey): ModuleTheme =>
  (modules as Record<string, ModuleTheme>)[key];

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;

export const radius = { sm: 8, md: 12, card: 18, pill: 999 } as const;

export const typography = {
  screenTitle: { fontSize: 26, fontWeight: '600' },
  sectionHeading: { fontSize: 17, fontWeight: '600' },
  body: { fontSize: 15, fontWeight: '400' },
  supporting: { fontSize: 13, fontWeight: '400' },
  numeric: { fontSize: 28, fontWeight: '500' },
} as const;
