// Central design tokens. Source of truth: claude_docs/design_system/UI_Design_System.md.
// Screens must read colors from here, never hardcode hex values.

export const colors = {
  neutral: {
    background: '#F5F6F4',
    backgroundSecondary: '#ECEFEC',
    backgroundTertiary: '#E2E6E3',
    surface: '#FFFFFF',
    text: '#343A38',
    textSecondary: '#858D88',
    border: '#E5E9E6',
    iconMuted: '#858D88',
  },
  semantic: {
    danger: { primary: '#B5483F', container: '#F6E1DE' },
    success: { primary: '#4E8B5F', container: '#E0EFE4' },
  },
  modules: {
    events: { primary: '#527DAA', container: '#E0EAF4', subtle: '#F1F5FA' },
    recipes: { primary: '#BB735E', container: '#F3E3DE', subtle: '#FAF2EF' },
    shopping: { primary: '#789477', container: '#E4EDE2', subtle: '#F2F6F0' },
    contacts: { primary: '#087F80', container: '#D9EEEE', subtle: '#EFF8F7' },
    websites: { primary: '#8876AA', container: '#EAE4F3', subtle: '#F5F2F9' },
    library: { primary: '#64866C', container: '#E3ECE4', subtle: '#F2F6F2' },
    subscriptions: { primary: '#C16F7E', container: '#F4E2E6', subtle: '#FBF2F4' },
    utilities: { primary: '#C58A36', container: '#F5E9D5', subtle: '#FBF6EC' },
  },
} as const;

export type ModuleKey = keyof typeof colors.modules;
export type ModuleTheme = (typeof colors.modules)[ModuleKey];

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;

export const radius = { sm: 8, md: 12, card: 18, pill: 999 } as const;

export const typography = {
  screenTitle: { fontSize: 26, fontWeight: '600' },
  sectionHeading: { fontSize: 17, fontWeight: '600' },
  body: { fontSize: 15, fontWeight: '400' },
  supporting: { fontSize: 13, fontWeight: '400' },
  numeric: { fontSize: 28, fontWeight: '500' },
} as const;
