import React from 'react';
import styled from '@emotion/native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {
  RootStackNavigatorProps,
  RootStackParamList,
} from '../navigations/RootStackNavigator';
import {RouteProp} from '@react-navigation/core';
import {getString} from '../../../STRINGS';

import {useTodos} from '../../providers/TodosProvider';

const Container = styled(SafeAreaView)`
  flex: 1;
  align-self: stretch;

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  background: ${({theme}) => theme.background};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 90px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;

  background: ${({theme}) => theme.header};
`;

const HeaderTitle = styled.Text`
  font-size: 26px;
  font-family: ChauPhilomeneOne;
`;

const Body = styled.View`
  flex: 1;
  justify-content: space-between;
  width: 100%;
  border-color: ${({theme}) => theme.background};
`;

const TaskListContainer = styled.View`
  align-items: center;
  padding-top: 12px;
`;

const ListItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 380px;
  margin-top: 12px;
  margin-bottom: 12px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;

  box-shadow: 1px 1px 1px gray;

  background-color: ${({theme}) => theme.listCard};
`;

const ListText = styled.Text`
  font-family: ChauPhilomeneOne;
`;

const ListCount = styled.Text`
  margin-right: 30px;
`;

type Props = {
  navigation: RootStackNavigatorProps<'Home'>;
  route: RouteProp<RootStackParamList, 'Home'>;
};

const Home: React.FC<Props> = ({navigation}) => {
  const {todos, highlightedTodos} = useTodos();

  return (
    <Container>
      <Header>
        <HeaderTitle>{getString('TODO_TITLE')}</HeaderTitle>
      </Header>
      <Body>
        <TaskListContainer>
          <ListItem onPress={() => navigation.navigate('HighlightedList')}>
            <ListText>{getString('HIGHLIGHT')}</ListText>
            <ListCount>{highlightedTodos.length}</ListCount>
          </ListItem>
          <ListItem onPress={() => navigation.navigate('TodoList')}>
            <ListText>{getString('MY_LIST')}</ListText>
            <ListCount>{todos.length}</ListCount>
          </ListItem>
        </TaskListContainer>
      </Body>
    </Container>
  );
};

export default Home;
