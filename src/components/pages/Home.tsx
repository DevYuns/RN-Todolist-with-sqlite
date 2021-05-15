import React, {useState} from 'react';
import styled from '@emotion/native';
import {FlatList, Image, Keyboard, TouchableOpacity} from 'react-native';
import Todo from '../uis/Todo';
import {IC_ADD} from '../../utils/Icons';
import type {TodoType} from '../uis/Todo';
import produce from 'immer';
import {fbt} from 'fbt';
import {useDatabase} from '../../providers/DatabaseProvider';

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
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 40px;
  line-height: 49px;
  font-family: ChauPhilomeneOne;
  color: ${({theme}) => theme.titleText};
`;

const TextInputWrapper = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  align-self: center;
`;

const StyledTextInput = styled.TextInput`
  height: 40px;
  width: 268px;
`;

const ListWrapper = styled.View`
  width: 300px;
  margin-top: 40px;
`;

const ListTitle = styled.Text`
  font-size: 18px;
  line-height: 25px;
  margin-bottom: 20px;
  font-family: ChauPhilomeneOne;
`;

const Home: React.FC = () => {
  const [todoText, setTodoText] = useState<string>('');

  const {
    todoCtx,
    createTodo,
    deleteTodo,
    toggleCompletedState,
    updateTodos,
  } = useDatabase();

  const onInsert = (): void => {
    if (todoText === '') return;

    Keyboard.dismiss();
    createTodo(todoText);
    setTodoText('');
  };

  const onDelete = (item: TodoType): void => {
    const onDeleteItem = todoCtx.filter((el) => el.id === item.id);

    deleteTodo(onDeleteItem[0].id);
  };

  const onCompleted = (item: TodoType): void => {
    const onCompletedItem = todoCtx.filter((el) => el.id === item.id);

    const newState = !onCompletedItem[0].isCompleted;

    toggleCompletedState(onCompletedItem[0].id, newState);
  };

  const onEdited = (item: TodoType, newText: string): void => {
    Keyboard.dismiss();

    const onEditedItem = todoCtx.filter((el) => el.id === item.id);

    updateTodos(onEditedItem[0].id, newText);
  };
  // const onEdited = useCallback(
  //   (item: TodoType, str: string): void => {
  //     Keyboard.dismiss();

  //     const index = todos.findIndex((el) => el.id === item.id);

  //     const nextState = produce(todos, (draft) => {
  //       draft[index] = item;
  //       draft[index].text = str;
  //       draft[index].isModalOpened = !item.isModalOpened;
  //     });

  //     setTodos(nextState);
  //   },
  //   [todos],
  // );

  return (
    <Container>
      <TitleWrapper>
        <Title>{fbt("What's your plan?", "what's your plan?")}</Title>
      </TitleWrapper>
      <TextInputWrapper>
        <StyledTextInput
          value={todoText}
          onChangeText={(text) => setTodoText(text)}
        />
        <TouchableOpacity onPress={onInsert}>
          <Image source={IC_ADD} />
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
          data={todoCtx}
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
