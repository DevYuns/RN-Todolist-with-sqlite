import styled from '@emotion/native';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Text} from 'react-native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default function App(): any {
  return (
    <Container>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </Container>
  );
}
