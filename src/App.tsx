import React from 'react';
import RootProvider from './providers';
import {useFonts} from 'expo-font';
import RootViewWrapper from './components/RootViewWrapper';
import {useAssets} from 'expo-asset';
import Icons from './utils/Icons';
import {initFbt} from './utils/fbt';
import {useTodos} from './providers/TodosProvider';
import Fonts from './utils/Fonts';
import AppLoading from 'expo-app-loading';

initFbt();

const App: React.FC = () => {
  const [assets] = useAssets(Icons);

  const [fontLoaded] = useFonts(Fonts);

  const {isDBLoadingCompleted} = useTodos();

  if (!isDBLoadingCompleted || !assets || !fontLoaded) return <AppLoading />;

  return <RootViewWrapper />;
};

const RootApp: React.FC = () => {
  return (
    <RootProvider>
      <App />
    </RootProvider>
  );
};

export default RootApp;
