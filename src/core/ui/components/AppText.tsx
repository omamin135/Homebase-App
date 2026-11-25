import { Text, type TextProps } from 'react-native';
import { colors, typography } from '../../theme';

type Variant = keyof typeof typography;
type Tone = 'primary' | 'secondary' | 'danger' | 'success' | 'inverse';

const toneColor: Record<Tone, string> = {
  primary: colors.neutral.text.primary,
  secondary: colors.neutral.text.secondary,
  danger: colors.semantic.danger.primary,
  success: colors.semantic.success.primary,
  inverse: colors.neutral.surface.primary,
};

type Props = TextProps & { variant?: Variant; tone?: Tone };

// Text with the design-system typography and color tones applied.
export function AppText({ variant = 'body', tone = 'primary', style, ...rest }: Props) {
  return <Text style={[typography[variant], { color: toneColor[tone] }, style]} {...rest} />;
}
