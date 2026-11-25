import House from 'lucide-react-native/icons/house';
import Settings from 'lucide-react-native/icons/settings';
import { TabList, TabSlot, TabTrigger, Tabs } from 'expo-router/ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../src/core/theme';
import {
  BOTTOM_NAV_HEIGHT,
  BOTTOM_NAV_MIN_WIDTH,
  BOTTOM_NAV_OFFSET,
} from '../src/core/ui/navigation/bottom-nav';
import { NavTab } from '../src/core/ui/navigation/NavTab';

// Root layout: page content plus the floating bottom navigation pill.
// TabTriggers must be direct children of TabList, so the bar is defined here.
export default function RootLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs style={{ flex: 1, backgroundColor: colors.neutral.background.primary }}>
      <TabSlot />
      <TabList
        style={{
          position: 'absolute',
          bottom: insets.bottom + BOTTOM_NAV_OFFSET,
          alignSelf: 'center',
          minWidth: BOTTOM_NAV_MIN_WIDTH,
          height: BOTTOM_NAV_HEIGHT,
          flexDirection: 'row',
          alignItems: 'stretch',
          gap: spacing.xs,
          padding: spacing.xs,
          backgroundColor: colors.neutral.surface.primary,
          borderRadius: radius.pill,
          borderWidth: 1,
          borderColor: colors.neutral.border.subtle,
        }}
      >
        <TabTrigger name="home" href="/" asChild>
          <NavTab label="Home" icon={House} />
        </TabTrigger>
        <TabTrigger name="settings" href="/settings" asChild>
          <NavTab label="Settings" icon={Settings} />
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}
