import styled from '@emotion/native';
import {RouteProp} from '@react-navigation/core';
import React from 'react';
import {FlatList, Image, Keyboard} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getString} from '../../../STRINGS';
import {TodoType, useTodos} from '../../providers/TodosProvider';
import {IC_ARROW} from '../../utils/icons';
import {
  RootStackNavigatorProps,
  RootStackParamList,
} from '../navigations/RootStackNavigator';
import {TodoItem} from '../uis/Todo';

const Container = styled(SafeAreaView)`
  flex: 1;
  align-self: stretch;

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  background: ${({theme}) => theme.background};
`;

const Header = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  height: 50px;

  margin-bottom: 30px;
  background: ${({theme}) => theme.background};
`;

const Title = styled.Text`
  font-size: 22px;
  font-family: ChauPhilomeneOne;
`;

const TodoListWrapper = styled.View`
  width: 400px;
  margin-top: 40px;
`;

type Props = {
  navigation: RootStackNavigatorProps<'HighlightedList'>;
  route: RouteProp<RootStackParamList, 'HighlightedList'>;
};

const HighlightedList: React.FC<Props> = ({navigation}) => {
  const {
    highlightedTodos,
    toggleCompleteStatus,
    toggleHighlightStatus,
    updateTodos,
    deleteTodo,
  } = useTodos();

  const toggleComplete = (item: TodoType): void => {
    const onCompletedItem = highlightedTodos.filter((el) => el.id === item.id);

    const newState = !onCompletedItem[0].isCompleted;

    toggleCompleteStatus(onCompletedItem[0].id, newState);
  };

  const toggleHighlight = (item: TodoType): void => {
    const onHighlightedItem = highlightedTodos.filter(
      (el) => el.id === item.id,
    );

    const newState = !onHighlightedItem[0].isHighlighted;

    toggleHighlightStatus(onHighlightedItem[0].id, newState);
  };

  const handleEdit = (item: TodoType, newText: string): void => {
    Keyboard.dismiss();

    const onEditedItem = highlightedTodos.filter((el) => el.id === item.id);

    updateTodos(onEditedItem[0].id, newText);
  };

  const handleDelete = (item: TodoType): void => {
    const onDeleteItem = highlightedTodos.filter((el) => el.id === item.id);

    deleteTodo(onDeleteItem[0].id);
  };

  return (
    <Container>
      <Header onPress={() => navigation.goBack()}>
        <Image
          source={IC_ARROW}
          style={{transform: [{scaleX: -1}], marginLeft: 30, marginRight: 20}}
        />
        <Title>{getString('HIGHLIGHT_LIST')}</Title>
      </Header>
      <TodoListWrapper>
        <FlatList
          style={{alignSelf: 'stretch'}}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{
            alignSelf: 'stretch',
            paddingHorizontal: 16,
          }}
          data={highlightedTodos}
          renderItem={({item}) => (
            <TodoItem
              todoItem={item}
              toggleComplete={() => toggleComplete(item)}
              toggleHighlight={() => toggleHighlight(item)}
              onEdit={handleEdit}
              onDelete={() => handleDelete(item)}
            />
          )}
        />
      </TodoListWrapper>
    </Container>
  );
};

export default HighlightedList;
