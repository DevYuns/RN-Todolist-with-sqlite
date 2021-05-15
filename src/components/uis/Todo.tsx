import styled from '@emotion/native';
import React, {useState} from 'react';
import {Image, Modal, TouchableOpacity} from 'react-native';
import {IC_TRASH} from '../../utils/Icons';
import {CheckBox} from './Checkbox';
import ModalScreen from './ModalScreen';
import type {DBTodoType} from '../../utils/database';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 280px;
  height: 30px;
  margin-top: 5px;
`;

const ListText = styled.Text<{done: boolean}>`
  font-size: 16px;
  font-family: ChauPhilomeneOne;
  color: ${({theme}) => theme.subText};

  margin-left: 10px;
  text-decoration-line: ${({done}) => (done ? 'line-through' : null)};
`;

const LeftWrapper = styled.View`
  flex-direction: row;
  align-items: center;

  overflow: hidden;
`;

const RightWrapper = styled.TouchableOpacity``;

// export type TodoType = {
//   id: number;
//   isModalOpened: boolean;
//   iscompleted: boolean;
//   text: string;
// };

export type TodoType = Pick<DBTodoType, 'id' | 'isCompleted' | 'text'>;

interface Props {
  todoItem: TodoType;
  onCompleted: () => void;
  onEdit: (item: TodoType, str: string) => void;
  onDelete: () => void;
}

const Todo: React.FC<Props> = ({
  todoItem,
  onCompleted,
  onEdit,
  onDelete,
}: Props) => {
  const [localModalState, setLocalMoalState] = useState<boolean>(false);

  return (
    <Container>
      <Modal
        animationType="fade"
        visible={localModalState}
        onRequestClose={() => setLocalMoalState(!localModalState)}
        transparent={true}>
        <ModalScreen
          closeModal={() => setLocalMoalState(!localModalState)}
          text={todoItem.text}
          todoItem={todoItem}
          onEdit={onEdit}
        />
      </Modal>
      <LeftWrapper>
        <CheckBox isChecked={todoItem.isCompleted} onToggle={onCompleted} />
        <TouchableOpacity onPress={() => setLocalMoalState(!localModalState)}>
          <ListText numberOfLines={1} done={todoItem.isCompleted}>
            {todoItem.text}
          </ListText>
        </TouchableOpacity>
      </LeftWrapper>
      <RightWrapper onPress={onDelete}>
        <Image source={IC_TRASH} />
      </RightWrapper>
    </Container>
  );
};

export default Todo;
