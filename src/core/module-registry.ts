import type { Href } from 'expo-router';
import type { ModuleKey } from './theme';

export type ModuleDefinition = {
  id: string;
  name: string;
  /** Key into colors.modules */
  theme: ModuleKey;
  /** Expo Router path of the module's entry screen */
  route: Href;
  /** Short line shown on the dashboard card */
  description?: string;
};

// Each module adds itself here. The dashboard renders whatever is registered.
export const moduleRegistry: ModuleDefinition[] = [];
