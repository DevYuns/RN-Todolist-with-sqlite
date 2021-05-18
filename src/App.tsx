import React from 'react';
import RootProvider from './providers';
import {useFonts} from 'expo-font';
import {useAssets} from 'expo-asset';
import icons from './utils/icons';
import {useTodos} from './providers/TodosProvider';
import fonts from './utils/fonts';
import AppLoading from 'expo-app-loading';
import styled from '@emotion/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Home from './components/pages/Home';

const Container = styled(SafeAreaView)`
  flex: 1;
  align-self: stretch;

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  background: ${({theme}) => theme.background};
`;

const App: React.FC = () => {
  const [assets] = useAssets(icons);

  const [fontLoaded] = useFonts(fonts);

  const {isTodoReady} = useTodos();

  if (!isTodoReady || !assets || !fontLoaded) return <AppLoading />;

  return (
    <Container>
      <Home />
    </Container>
  );
};

const RootApp: React.FC = () => {
  return (
    <RootProvider>
      <App />
    </RootProvider>
  );
};

export default RootApp;
