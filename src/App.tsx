import React from 'react';
import RootProvider from './providers';
import {useFonts} from 'expo-font';
import {useTodos} from './providers/TodosProvider';
import fonts from './utils/fonts';
import AppLoading from 'expo-app-loading';

import Home from './components/pages/Home';

const App: React.FC = () => {
  const [fontLoaded] = useFonts(fonts);

  const {isTodoReady} = useTodos();

  if (!isTodoReady || !fontLoaded) return <AppLoading />;

  return <Home />;
};

const RootApp: React.FC = () => {
  return (
    <RootProvider>
      <App />
    </RootProvider>
  );
};

export default RootApp;
