import styled from '@emotion/native';
import React, {useState} from 'react';
import {Image, Modal, TouchableOpacity} from 'react-native';
import {IC_TRASH, IC_TRASH_BLACK} from '../../../utils/icons';
import {CheckBox} from '../Checkbox';
import EditTodoModal from './EditTodoModal';
import type {TodoType} from '../../../utils/database';
import {ThemeType, useTheme} from '../../../providers/ThemeProvider';

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

interface Props {
  todoItem: TodoType;
  toggleComplete: () => void;
  onEdit: (item: TodoType, str: string) => void;
  onDelete: () => void;
}

const TodoItem: React.FC<Props> = ({
  todoItem,
  toggleComplete,
  onEdit: handleEdit,
  onDelete: handleDelete,
}) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const {themeType} = useTheme();

  return (
    <Container>
      <Modal
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setModalVisible((prev) => !prev)}
        transparent={true}>
        <EditTodoModal
          closeModal={() => setModalVisible((prev) => !prev)}
          todoText={todoItem.text}
          todoItem={todoItem}
          onEdit={handleEdit}
        />
      </Modal>
      <LeftWrapper>
        <CheckBox isChecked={todoItem.isCompleted} onToggle={toggleComplete} />
        <TouchableOpacity onPress={() => setModalVisible((prev) => !prev)}>
          <ListText numberOfLines={1} done={todoItem.isCompleted}>
            {todoItem.text}
          </ListText>
        </TouchableOpacity>
      </LeftWrapper>
      <RightWrapper onPress={handleDelete}>
        <Image
          source={themeType === ThemeType.LIGHT ? IC_TRASH : IC_TRASH_BLACK}
          width={15}
          height={15}
        />
      </RightWrapper>
    </Container>
  );
};

export {TodoItem};
