import styled from '@emotion/native';
import React, {useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {IC_CLOSE, IC_EDIT} from '../../utils/Icons';
import {TodoType} from './Todo';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: #00000080;
  opacity: 10;
`;

const CloseWrapper = styled.TouchableOpacity`
  position: absolute;
  right: 50px;
  top: 50px;
`;

const TextInputWrapper = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  align-self: center;

  padding: 10px;
  border-radius: 10px;
  background-color: white;
`;

const StyledTextInput = styled.TextInput`
  height: 40px;
  width: 268px;
`;

interface Props {
  text: string;
  onEdit: (item: TodoType, str: string) => void;
  todoItem: TodoType;
  closeModal: () => void;
}

const ModalScreen: React.FC<Props> = ({
  closeModal,
  text,
  todoItem,
  onEdit,
}: Props) => {
  const [editedTodoText, setEditedTodo] = useState<string>(text);

  const handleEdit = (): void => {
    onEdit(todoItem, editedTodoText);
  };

  return (
    <Container>
      <CloseWrapper onPress={closeModal}>
        <Image source={IC_CLOSE} />
      </CloseWrapper>
      <TextInputWrapper>
        <StyledTextInput
          value={editedTodoText}
          onChangeText={(newText) => setEditedTodo(newText)}
        />
        <TouchableOpacity onPress={handleEdit}>
          <Image source={IC_EDIT} />
        </TouchableOpacity>
      </TextInputWrapper>
    </Container>
  );
};

export default ModalScreen;
