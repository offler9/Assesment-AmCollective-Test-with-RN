import 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import ApplicationNavigator from './screen';
import { ContextProviderCollection } from './context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar translucent backgroundColor="transparent" />
      <ContextProviderCollection>
        <GestureHandlerRootView>
          <ApplicationNavigator />
        </GestureHandlerRootView>
      </ContextProviderCollection>
    </SafeAreaProvider>
  );
}

