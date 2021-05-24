import styled from '@emotion/native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {CheckBox} from '../Checkbox';
import type {TodoType} from '../../../utils/database';
import {colors} from '../../../theme';
import {AntDesign} from '@expo/vector-icons';

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 350px;
  height: 50px;

  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;

  border-radius: 10px;
  background-color: ${({theme}) => theme.background};
  box-shadow: 1px 1px 1px lightgray;
`;

const LeftWrapper = styled.View`
  flex-direction: row;
  align-items: center;

  width: 280px;
`;

const EditModeWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 20px;
  width: 280px;
  border-bottom-width: 1px;
  border-color: black;
`;

const EditTextWrapper = styled.View`
  width: 240px;
  overflow: hidden;
`;

const EditText = styled.TextInput``;

const ListTextWrapper = styled.View`
  width: 240px;
  overflow: hidden;
`;

const ListText = styled.Text<{done: boolean}>`
  font-size: 16px;
  font-family: ChauPhilomeneOne;
  color: ${({theme, done}) => (done ? colors.grey_40 : theme.text)};

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
    setDeleteVisible(true);
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

  return (
    <Container onLongPress={() => hadleOnLongPress()}>
      <LeftWrapper>
        <CheckBox isChecked={todoItem.isCompleted} onToggle={toggleComplete} />

        {isEditVisible ? (
          <EditModeWrapper>
            <EditTextWrapper>
              <EditText
                value={editedText}
                onChangeText={(newText) => setEditedText(newText)}
              />
            </EditTextWrapper>
            <TouchableOpacity onPress={() => handleEdit()}>
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
          </EditModeWrapper>
        ) : (
          <TouchableOpacity onPress={() => setEditVisible(true)}>
            <ListTextWrapper>
              <ListText numberOfLines={1} done={todoItem.isCompleted}>
                {todoItem.text}
              </ListText>
            </ListTextWrapper>
          </TouchableOpacity>
        )}
      </LeftWrapper>
      {!isDeleteVisible && !isEditVisible ? (
        <TouchableOpacity onPress={toggleHighlight}>
          {todoItem.isHighlighted ? (
            <AntDesign name="star" size={24} color="yellow" />
          ) : (
            <AntDesign name="staro" size={24} color="black" />
          )}
        </TouchableOpacity>
      ) : null}
      {isDeleteVisible ? (
        <TouchableOpacity onPress={handleDelete}>
          <AntDesign name="delete" size={24} color="black" />
        </TouchableOpacity>
      ) : null}
    </Container>
  );
};

export {TodoItem};
