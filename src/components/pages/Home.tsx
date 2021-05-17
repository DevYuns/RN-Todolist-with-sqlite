import React, {useState} from 'react';
import styled from '@emotion/native';
import {FlatList, Keyboard, TouchableOpacity} from 'react-native';
import Todo from '../uis/Todo';
import {IC_ADD, IC_ADD_WHITE} from '../../utils/Icons';
import {fbt} from 'fbt';
import {TodoType, useTodos} from '../../providers/TodosProvider';
import {ThemeType, useTheme} from '../../providers/ThemeProvider';

const Container = styled.View`
  flex: 1;
  align-self: stretch;

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  padding-top: 35px;
`;

const TitleWrapper = styled.View`
  width: 335px;
  flex-direction: row;
  justify-content: center;
  margin-top: 35px;
  margin-bottom: 40px;
`;

const Title = styled.Text`
  font-size: 40px;
  line-height: 49px;
  font-family: ChauPhilomeneOne;
  color: ${({theme}) => theme.titleText};
`;

const ThemeChangeWrapper = styled.TouchableOpacity`
  margin-bottom: 20px;
`;

const ThemeChange = styled.Text`
  color: ${({theme}) => theme.titleText};
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
  color: ${({theme}) => theme.subText};
`;

const AddButton = styled.Image``;

const ListWrapper = styled.View`
  width: 300px;
  margin-top: 40px;
`;

const ListTitle = styled.Text`
  font-size: 18px;
  line-height: 25px;
  margin-bottom: 20px;
  font-family: ChauPhilomeneOne;
  color: ${({theme}) => theme.subText};
`;

const Home: React.FC = () => {
  const [todoText, setTodoText] = useState<string>('');

  const {changeThemeType, themeType} = useTheme();

  const {
    todos,
    createTodo,
    deleteTodo,
    toggleCompletedState,
    updateTodos,
  } = useTodos();

  const onInsert = (): void => {
    if (todoText === '') return;

    Keyboard.dismiss();
    createTodo(todoText);
    setTodoText('');
  };

  const onDelete = (item: TodoType): void => {
    const onDeleteItem = todos.filter((el) => el.id === item.id);

    deleteTodo(onDeleteItem[0].id);
  };

  const onCompleted = (item: TodoType): void => {
    const onCompletedItem = todos.filter((el) => el.id === item.id);

    const newState = !onCompletedItem[0].isCompleted;

    toggleCompletedState(onCompletedItem[0].id, newState);
  };

  const onEdited = (item: TodoType, newText: string): void => {
    Keyboard.dismiss();

    const onEditedItem = todos.filter((el) => el.id === item.id);

    updateTodos(onEditedItem[0].id, newText);
  };

  return (
    <Container>
      <TitleWrapper>
        <Title>{fbt("What's your plan?", "what's your plan?")}</Title>
      </TitleWrapper>
      <ThemeChangeWrapper onPress={() => changeThemeType()}>
        <ThemeChange>Theme change</ThemeChange>
      </ThemeChangeWrapper>
      <TextInputWrapper>
        <StyledTextInput
          value={todoText}
          onChangeText={(text) => setTodoText(text)}
        />
        <TouchableOpacity onPress={onInsert}>
          <AddButton
            source={themeType === ThemeType.LIGHT ? IC_ADD : IC_ADD_WHITE}
          />
        </TouchableOpacity>
      </TextInputWrapper>
      <ListWrapper>
        <ListTitle>Upcoming To-do's</ListTitle>
        <FlatList
          style={{alignSelf: 'stretch'}}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{
            alignSelf: 'stretch',
            paddingHorizontal: 16,
          }}
          data={todos}
          renderItem={({item}) => (
            <Todo
              todoItem={item}
              onCompleted={() => onCompleted(item)}
              onEdit={onEdited}
              onDelete={() => onDelete(item)}
            />
          )}
        />
      </ListWrapper>
    </Container>
  );
};

export default Home;
