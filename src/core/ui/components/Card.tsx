import { View, type ViewProps } from 'react-native';
import { colors, radius, spacing } from '../../theme';

// White surface with a thin border and large corner radius.
export function Card({ style, ...rest }: ViewProps) {
  return (
    <View
      style={[
        {
          padding: spacing.lg,
          gap: spacing.md,
          backgroundColor: colors.neutral.surface.primary,
          borderRadius: radius.card,
          borderWidth: 1,
          borderColor: colors.neutral.border.subtle,
        },
        style,
      ]}
      {...rest}
    />
  );
}
