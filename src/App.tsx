import React from 'react';
import RootProvider from './providers';
import {useFonts} from 'expo-font';
import RootViewWrapper from './components/RootViewWrapper';
import {useAssets} from 'expo-asset';
import Icons from './utils/Icons';
import {initFbt} from './utils/fbt';
import {useTodos} from './providers/TodosProvider';

initFbt();

const App: React.FC = () => {
  const [assets] = useAssets(Icons);

  const [fontLoaded] = useFonts({
    ChauPhilomeneOne: require('../assets/fonts/ChauPhilomeneOne-Regular.ttf'),
  });

  const {isDBLoadingCompleted} = useTodos();

  if (!isDBLoadingCompleted || !assets || !fontLoaded) return null;

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
