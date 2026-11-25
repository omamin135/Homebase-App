import { Pressable } from "react-native";
import type { TabTriggerSlotProps } from "expo-router/ui";
import type { LucideIcon } from "lucide-react-native";
import { colors, radius } from "../../theme";

type Props = Omit<TabTriggerSlotProps, "ref"> & {
  label: string;
  icon: LucideIcon;
};

// One icon-only item in the bottom navigation. Rendered as the child of a
// TabTrigger (asChild), which passes isFocused and press handlers.
// TabTrigger also passes its own `style`; it is dropped so ours applies.
export function NavTab({
  label,
  icon: Icon,
  isFocused,
  style: _ignored,
  ...rest
}: Props) {
  return (
    <Pressable
      {...rest}
      accessibilityRole="tab"
      accessibilityLabel={label}
      accessibilityState={{ selected: isFocused }}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.pill,
        backgroundColor: isFocused
          ? colors.neutral.background.secondary
          : "transparent",
      }}
    >
      <Icon
        size={26}
        color={isFocused ? colors.neutral.text.primary : colors.neutral.icon.muted}
        strokeWidth={isFocused ? 2.25 : 1.75}
      />
    </Pressable>
  );
}
