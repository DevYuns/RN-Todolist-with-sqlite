import React, {useCallback, useState} from 'react';
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
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [todoText, setTodoText] = useState<string>('');

  const {dbTodos} = useDatabase();

  console.log('홈 투두', dbTodos);

  const onToggleModal = useCallback(
    (item: TodoType): void => {
      const index = todos.findIndex((el) => el.id === item.id);

      const nextState = produce(todos, (draft) => {
        draft[index] = item;
        draft[index].isModalOpened = !item.isModalOpened;
      });

      setTodos(nextState);
    },
    [todos],
  );

  const onInsert = useCallback((): void => {
    if (!todoText) return;

    Keyboard.dismiss();

    const nextState = produce(todos, (draft) => {
      draft.push({
        id: Date.now().toString(),
        isModalOpened: false,
        iscompleted: false,
        text: todoText,
      });
    });

    setTodoText('');
    setTodos(nextState);
  }, [todoText, todos]);

  const onDelete = useCallback(
    (item: TodoType): void => {
      const index = todos.findIndex((el) => el.id === item.id);

      const nextState = produce(todos, (draft) => {
        draft[index] = item;
        draft.splice(index, 1);
      });

      setTodos(nextState);
    },
    [todos],
  );

  const onCompleted = useCallback(
    (item: TodoType): void => {
      const index = todos.findIndex((el) => el.id === item.id);

      const nextState = produce(todos, (draft) => {
        draft[index] = item;
        draft[index].iscompleted = !item.iscompleted;
      });

      setTodos(nextState);
    },
    [todos],
  );

  const onEdited = useCallback(
    (item: TodoType, str: string): void => {
      Keyboard.dismiss();

      const index = todos.findIndex((el) => el.id === item.id);

      const nextState = produce(todos, (draft) => {
        draft[index] = item;
        draft[index].text = str;
        draft[index].isModalOpened = !item.isModalOpened;
      });

      setTodos(nextState);
    },
    [todos],
  );

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
          data={todos}
          renderItem={({item}) => (
            <Todo
              todoItem={item}
              onCompleted={() => onCompleted(item)}
              onEdit={onEdited}
              onDelete={() => onDelete(item)}
              onToggleModal={() => onToggleModal(item)}
            />
          )}
        />
      </ListWrapper>
    </Container>
  );
};

export default Home;
