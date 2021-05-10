import React from 'react';
import RootProvider from './providers';
import {useFonts} from 'expo-font';
import RootViewWrapper from './components/RootViewWrapper';

const App: React.FC = () => {
  const [fontLoaded] = useFonts({
    ChauPhilomeneOne: require('../assets/fonts/ChauPhilomeneOne-Regular.ttf'),
  });

  if (!fontLoaded) return null;

  return (
    <RootProvider>
      <RootViewWrapper />
    </RootProvider>
  );
};

export default App;
