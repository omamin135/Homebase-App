import { Pressable, type PressableProps } from 'react-native';
import { colors, radius, spacing } from '../../theme';
import { AppText } from './AppText';

type Props = Omit<PressableProps, 'children'> & {
  label: string;
  /** Module accent color for the background. Defaults to charcoal. */
  color?: string;
};

export function Button({ label, color = colors.neutral.text, disabled, style, ...rest }: Props) {
  return (
    <Pressable
      disabled={disabled}
      style={(state) => [
        {
          alignItems: 'center',
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.xl,
          borderRadius: radius.pill,
          backgroundColor: color,
          opacity: disabled ? 0.5 : 1,
        },
        typeof style === 'function' ? style(state) : style,
      ]}
      {...rest}
    >
      <AppText tone="inverse" style={{ fontWeight: '500' }}>
        {label}
      </AppText>
    </Pressable>
  );
}
