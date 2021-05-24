import React, {useState} from 'react';
import {FlatList, Image, Keyboard, TouchableOpacity} from 'react-native';
import {
  RootStackNavigatorProps,
  RootStackParamList,
} from '../navigations/RootStackNavigator';

import {RouteProp} from '@react-navigation/core';
import styled from '@emotion/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IC_ADD, IC_ADD_WHITE, IC_ARROW} from '../../utils/icons';
import {TodoType, useTodos} from '../../providers/TodosProvider';
import {TodoItem} from '../uis/Todo';
import {ThemeType, useTheme} from '../../providers/ThemeProvider';
import {getString} from '../../../STRINGS';

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

const TextInputWrapper = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  align-self: center;
  border-color: ${({theme}) => theme.border};
`;

const StyledTextInput = styled.TextInput`
  height: 40px;
  width: 268px;
  color: ${({theme}) => theme.text};
`;

const TodoListWrapper = styled.View`
  width: 400px;
  margin-top: 40px;
`;

type Props = {
  navigation: RootStackNavigatorProps<'TodoList'>;
  route: RouteProp<RootStackParamList, 'TodoList'>;
};

const TodoList: React.FC<Props> = ({navigation}) => {
  const [todoText, setTodoText] = useState<string>('');

  const {themeType} = useTheme();

  const {
    todos,
    createTodo,
    deleteTodo,
    toggleCompleteStatus,
    toggleHighlightStatus,
    updateTodos,
  } = useTodos();

  const handleInsert = (): void => {
    if (todoText === '') return;

    Keyboard.dismiss();
    createTodo(todoText);
    setTodoText('');
  };

  const handleDelete = (item: TodoType): void => {
    const onDeleteItem = todos.filter((el) => el.id === item.id);

    deleteTodo(onDeleteItem[0].id);
  };

  const toggleComplete = (item: TodoType): void => {
    const onCompletedItem = todos.filter((el) => el.id === item.id);

    const newState = !onCompletedItem[0].isCompleted;

    toggleCompleteStatus(onCompletedItem[0].id, newState);
  };

  const toggleHighlight = (item: TodoType): void => {
    const onHighlightedItem = todos.filter((el) => el.id === item.id);
    const newState = !onHighlightedItem[0].isHighlighted;

    toggleHighlightStatus(onHighlightedItem[0].id, newState);
  };

  const handleEdit = (item: TodoType, newText: string): void => {
    Keyboard.dismiss();

    const onEditedItem = todos.filter((el) => el.id === item.id);

    updateTodos(onEditedItem[0].id, newText);
  };

  return (
    <Container>
      <Header onPress={() => navigation.goBack()}>
        <Image
          source={IC_ARROW}
          style={{transform: [{scaleX: -1}], marginLeft: 30, marginRight: 20}}
        />
        <Title>{getString('MY_LIST')}</Title>
      </Header>
      <TextInputWrapper>
        <StyledTextInput
          placeholder={getString('PLACEHOLDER')}
          value={todoText}
          onChangeText={(text) => setTodoText(text)}
        />
        <TouchableOpacity onPress={handleInsert}>
          <Image
            source={themeType === ThemeType.LIGHT ? IC_ADD : IC_ADD_WHITE}
          />
        </TouchableOpacity>
      </TextInputWrapper>
      <TodoListWrapper>
        <FlatList
          style={{alignSelf: 'stretch'}}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{
            alignSelf: 'stretch',
            paddingHorizontal: 16,
          }}
          data={todos}
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

export default TodoList;
