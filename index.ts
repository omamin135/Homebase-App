// Entry point: registers the root component and nothing else.
import '@expo/metro-runtime';
import { registerRootComponent } from 'expo';
import App from './src/App';

registerRootComponent(App);
