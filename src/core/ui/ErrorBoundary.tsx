import { Component, type ErrorInfo, type ReactNode } from 'react';
import { View } from 'react-native';
import { colors, spacing } from '../theme';
import { AppText } from './components/AppText';
import { Button } from './components/Button';

type Props = { children: ReactNode };
type State = { error: Error | null };

// Last-resort fallback for unexpected render errors anywhere below it. It does
// not catch errors in event handlers or async code; handle those locally.
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled render error:', error, info.componentStack);
  }

  private reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: spacing.xl,
          gap: spacing.md,
          backgroundColor: colors.neutral.background,
        }}
      >
        <AppText variant="sectionHeading">Something went wrong</AppText>
        <AppText variant="supporting" tone="secondary" style={{ textAlign: 'center' }}>
          {error.message}
        </AppText>
        <Button label="Try again" onPress={this.reset} />
      </View>
    );
  }
}
