import React from 'react';
import styled from '@emotion/native';

import {SafeAreaView} from 'react-native-safe-area-context';
import Home from './pages/Home';

const Container = styled(SafeAreaView)`
  flex: 1;
  align-self: stretch;

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  background: ${({theme}) => theme.background};
`;

const RootViewWrapper: React.FC = () => {
  return (
    <Container>
      <Home />
    </Container>
  );
};

export default RootViewWrapper;
