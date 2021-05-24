import React from 'react';
import RootProvider from './providers';
import {useFonts} from 'expo-font';
import {useAssets} from 'expo-asset';
import icons from './utils/icons';
import {useTodos} from './providers/TodosProvider';
import fonts from './utils/fonts';
import AppLoading from 'expo-app-loading';

import RootNavigator from './components/navigations/RootStackNavigator';

const App: React.FC = () => {
  const [assets] = useAssets(icons);

  const [fontLoaded] = useFonts(fonts);

  const {isTodoReady} = useTodos();

  if (!isTodoReady || !assets || !fontLoaded) return <AppLoading />;

  return <RootNavigator />;
};

const RootApp: React.FC = () => {
  return (
    <RootProvider>
      <App />
    </RootProvider>
  );
};

export default RootApp;
