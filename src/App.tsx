import React from 'react';
import RootProvider from './providers';
import {useFonts} from 'expo-font';
import RootViewWrapper from './components/RootViewWrapper';
import {useAssets} from 'expo-asset';
import Icons from './utils/Icons';

const App: React.FC = () => {
  const [assets] = useAssets(Icons);

  const [fontLoaded] = useFonts({
    ChauPhilomeneOne: require('../assets/fonts/ChauPhilomeneOne-Regular.ttf'),
  });

  if (!assets) return null;

  if (!fontLoaded) return null;

  return (
    <RootProvider>
      <RootViewWrapper />
    </RootProvider>
  );
};

export default App;
