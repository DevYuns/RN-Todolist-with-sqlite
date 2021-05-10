import styled from '@emotion/native';
import React from 'react';
import {Text} from 'react-native';
import RootProvider from './providers';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const App: React.FC = () => {
  return (
    <RootProvider>
      <Container>
        <Text>Open up App.tsx to start working on your app!</Text>
      </Container>
    </RootProvider>
  );
};

export default App;
