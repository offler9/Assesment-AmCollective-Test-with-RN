import { StatusBar } from 'expo-status-bar';
import Home from './screen/home';
import { ContextProviderCollection } from './context';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar translucent backgroundColor="transparent" />
      <ContextProviderCollection>
        <Home />
      </ContextProviderCollection>
    </SafeAreaProvider>
  );
}

