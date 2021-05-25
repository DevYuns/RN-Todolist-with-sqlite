import styled from '@emotion/native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {CheckBox} from '../Checkbox';
import type {TodoType} from '../../../utils/database';
import {colors} from '../../../theme';
import {AntDesign, Feather} from '@expo/vector-icons';

const Container = styled.TouchableOpacity<{done: boolean}>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 380px;
  height: 50px;

  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;

  border-radius: 10px;
  background-color: ${({theme, done}) =>
    done ? colors.grey_30 : theme.listCard};
`;

const LeftWrapper = styled.View`
  flex-direction: row;
  align-items: center;

  width: 320px;
`;

const EditModeWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 20px;
  width: 320px;

  margin-left: 10px;
`;

const EditTextWrapper = styled.View`
  width: 270px;

  margin-right: 28px;
  overflow: hidden;
  border-bottom-width: 1px;
  border-color: black;
`;

const EditText = styled.TextInput``;

const ListTextWrapper = styled.View`
  width: 240px;
  overflow: hidden;
`;

const ListText = styled.Text<{done: boolean}>`
  font-size: 18px;
  font-family: RobotoMedium;
  color: ${({theme}) => theme.text};

  margin-left: 10px;
  text-decoration-line: ${({done}) => (done ? 'line-through' : null)};
`;

interface Props {
  todoItem: TodoType;
  toggleComplete?: () => void;
  toggleHighlight?: () => void;
  onEdit?: (item: TodoType, str: string) => void;
  onDelete?: () => void;
}

const TodoItem: React.FC<Props> = ({
  todoItem,
  toggleComplete,
  toggleHighlight,
  onEdit,
  onDelete,
}) => {
  const [editedText, setEditedText] = useState<string>(todoItem.text);
  const [isEditVisible, setEditVisible] = useState<boolean>(false);
  const [isDeleteVisible, setDeleteVisible] = useState<boolean>(false);

  const hadleOnLongPress = (): void => {
    setDeleteVisible((prev) => !prev);
  };

  const handleEdit = (): void => {
    if (editedText === '') {
      setEditedText(todoItem.text);
      setEditVisible(false);

      return;
    }

    if (onEdit) onEdit(todoItem, editedText);

    setEditVisible(false);
  };

  const handleDelete = (): void => {
    if (onDelete) onDelete();

    setDeleteVisible(false);
  };

  const renderTodoText = (): React.ReactElement => {
    if (!todoItem.isCompleted && isEditVisible)
      return (
        <EditModeWrapper>
          <EditTextWrapper>
            <EditText
              value={editedText}
              onChangeText={(newText) => setEditedText(newText)}
            />
          </EditTextWrapper>
          <TouchableOpacity onPress={() => handleEdit()}>
            <Feather name="edit-2" size={18} color="black" />
          </TouchableOpacity>
        </EditModeWrapper>
      );

    return (
      <TouchableOpacity
        onPress={() => {
          if (!todoItem.isCompleted) setEditVisible((prev) => !prev);
        }}>
        <ListTextWrapper>
          <ListText numberOfLines={1} done={todoItem.isCompleted}>
            {todoItem.text}
          </ListText>
        </ListTextWrapper>
      </TouchableOpacity>
    );
  };

  const renderDeleteButton = (): React.ReactElement => {
    return (
      <TouchableOpacity onPress={handleDelete}>
        <AntDesign name="delete" size={24} color="black" />
      </TouchableOpacity>
    );
  };

  return (
    <Container
      done={todoItem.isCompleted}
      onLongPress={() => hadleOnLongPress()}>
      <LeftWrapper>
        <CheckBox isChecked={todoItem.isCompleted} onToggle={toggleComplete} />
        {renderTodoText()}
      </LeftWrapper>
      {!isDeleteVisible && !isEditVisible ? (
        <TouchableOpacity onPress={toggleHighlight}>
          {todoItem.isHighlighted ? (
            <AntDesign name="star" size={24} color={colors.yellow} />
          ) : (
            <AntDesign name="staro" size={24} color="black" />
          )}
        </TouchableOpacity>
      ) : null}
      {isDeleteVisible ? renderDeleteButton() : null}
    </Container>
  );
};

export {TodoItem};
