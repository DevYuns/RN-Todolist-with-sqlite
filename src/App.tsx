import styled from '@emotion/native';
import React from 'react';
import {Text} from 'react-native';
import RootProvider from './providers';
import {useFonts} from 'expo-font';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const App: React.FC = () => {
  const [fontLoaded] = useFonts({
    ChauPhilomeneOne: require('../assets/fonts/ChauPhilomeneOne-Regular.ttf'),
  });

  if (!fontLoaded) return null;

  return (
    <RootProvider>
      <Container>
        <Text style={{fontFamily: 'ChauPhilomeneOne'}}>
          Open up App.tsx to start working on your app!
        </Text>
      </Container>
    </RootProvider>
  );
};

export default App;
