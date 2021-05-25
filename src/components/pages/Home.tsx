import React, {useState} from 'react';
import styled from '@emotion/native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {getString} from '../../../STRINGS';

import {TodoType, useTodos} from '../../providers/TodosProvider';
import SwitchToggle from 'react-native-switch-toggle';
import {useTheme} from '../../providers/ThemeProvider';
import {colors} from '../../theme';
import {FlatList, Keyboard, Platform, TouchableOpacity} from 'react-native';
import {TodoItem} from '../uis/Todo';
import {Ionicons} from '@expo/vector-icons';
import RadioButton from '../uis/RadioButton';

const Container = styled(SafeAreaView)`
  flex: 1;
`;

const Wrapper = styled.KeyboardAvoidingView`
  flex: 1;
  align-self: stretch;

  justify-content: flex-start;
  align-items: center;

  background-color: ${({theme}) => theme.background};
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
`;

const HeaderTitle = styled.Text`
  font-size: 28px;
  font-family: ChauPhilomeneOne;
  color: ${({theme}) => theme.title};
`;

const Body = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  height: 50px;

  background-color: ${({theme}) => theme.footer};
`;

const TodoListContainer = styled.View`
  padding-top: 15px;
  width: 100%;
`;

const TextInputWrapper = styled.View`
  align-items: flex-start;
  justify-content: center;

  width: 350px;
  height: 30px;

  padding-left: 10px;
  border-radius: 10px;
  margin-right: 15px;
  background-color: ${() => colors.grey_10};
`;

const StyledTextInput = styled.TextInput`
  height: 35px;
  width: 268px;
  color: ${({theme}) => theme.text};
`;

const ListCountWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  padding-left: 25px;
  padding-right: 25px;
`;

const RadioButtonWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ListCount = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.title};
`;

const EmptyTextWrapper = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const EmptyText = styled.Text`
  font-size: 24px;
  font-family: RobotoMediumItalic;
  color: ${({theme}) => theme.placeholder};
`;

enum ListType {
  ALL_TODOS = 'ALLTODOS',
  HIGHLIGHTED_TODOS = 'HIGHLIGHTED_TODOS',
}

const Home: React.FC = () => {
  const [themeToggle, setThemeToggle] = useState<boolean>(false);
  const [todoText, setTodoText] = useState<string>('');

  const [todoListType, setTodoListType] = useState<ListType>(
    ListType.ALL_TODOS,
  );

  const {
    todos,
    highlightedTodos,
    createTodo,
    deleteTodo,
    toggleCompleteStatus,
    toggleHighlightStatus,
    updateTodos,
  } = useTodos();

  const {theme, changeThemeType} = useTheme();

  const handleThemeSwitch = (): void => {
    setThemeToggle((prev) => !prev);
    changeThemeType();
  };

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
      <Wrapper
        behavior={Platform.select({
          ios: 'padding',
          android: 'height',
        })}>
        <Header>
          <HeaderTitle>{getString('TODO_TITLE')}</HeaderTitle>
          <SwitchToggle
            containerStyle={{
              width: 48,
              height: 26,
              borderRadius: 25,
              padding: 5,
              marginRight: 15,
            }}
            circleStyle={{
              width: 18,
              height: 18,
              borderRadius: 19,
            }}
            backgroundColorOn={colors.grey_20}
            backgroundColorOff={colors.grey_40}
            switchOn={themeToggle}
            onPress={handleThemeSwitch}
            circleColorOff={colors.grey_20}
            circleColorOn={colors.dark_blue}
            duration={300}
          />
        </Header>

        <Body>
          <ListCountWrapper>
            <RadioButtonWrapper>
              <RadioButton
                containerStyle={{marginRight: 12}}
                iconStyle={{backgroundColor: colors.dark}}
                value={ListType.ALL_TODOS}
                selectedValue={todoListType}
                onPress={() => setTodoListType(ListType.ALL_TODOS)}
              />
              <ListCount>
                {getString('TODO_SUM')} : {todos.length}
              </ListCount>
            </RadioButtonWrapper>

            <RadioButtonWrapper>
              <RadioButton
                containerStyle={{marginRight: 12}}
                value={ListType.HIGHLIGHTED_TODOS}
                selectedValue={todoListType}
                onPress={() => setTodoListType(ListType.HIGHLIGHTED_TODOS)}
              />
              <ListCount>
                {getString('HIGHLIGHT_SUM')} : {highlightedTodos.length}
              </ListCount>
            </RadioButtonWrapper>
          </ListCountWrapper>
          <TodoListContainer>
            <FlatList
              style={{alignSelf: 'stretch'}}
              keyExtractor={(_, index) => index.toString()}
              data={
                todoListType === ListType.ALL_TODOS ? todos : highlightedTodos
              }
              renderItem={({item}) => (
                <TodoItem
                  todoItem={item}
                  toggleComplete={() => toggleComplete(item)}
                  toggleHighlight={() => toggleHighlight(item)}
                  onEdit={handleEdit}
                  onDelete={() => handleDelete(item)}
                />
              )}
              contentContainerStyle={{
                alignItems: 'center',
                height: '100%',
              }}
              ListEmptyComponent={() => (
                <EmptyTextWrapper>
                  <EmptyText>{getString('EMPTY_TEXT')}</EmptyText>
                </EmptyTextWrapper>
              )}
            />
          </TodoListContainer>
        </Body>

        <Footer>
          <TextInputWrapper>
            <StyledTextInput
              placeholderTextColor={theme.placeholder}
              placeholder={getString('PLACEHOLDER')}
              value={todoText}
              onChangeText={(text) => setTodoText(text)}
            />
          </TextInputWrapper>
          <TouchableOpacity onPress={handleInsert}>
            <Ionicons name="add-circle" size={34} color={colors.grey_50} />
          </TouchableOpacity>
        </Footer>
      </Wrapper>
    </Container>
  );
};

export default Home;
