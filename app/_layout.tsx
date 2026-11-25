import { Stack } from 'expo-router';
import { colors } from '../src/core/theme';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.neutral.background },
      }}
    />
  );
}
