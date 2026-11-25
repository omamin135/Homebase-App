import { ExpoRoot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ErrorBoundary } from "./core/ui/ErrorBoundary";
import { Providers } from "./Providers";

// Expo Router needs a context of the route files in app/.
const routes = require.context("../app");

export default function App() {
  return (
    <ErrorBoundary>
      <Providers>
        <StatusBar style="dark" />
        <ExpoRoot context={routes} />
      </Providers>
    </ErrorBoundary>
  );
}
