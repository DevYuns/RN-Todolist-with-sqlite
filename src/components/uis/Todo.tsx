import styled from '@emotion/native';
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {IC_TRASH} from '../../utils/Icons';
import {CheckBox} from './Checkbox';

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

export type TodoType = {
  id: string;
  iscompleted: boolean;
  initialText: string;
  text: string;
};

interface Props {
  todos: TodoType;
  onCompleted: () => void;
  onEditPressed: () => void;
  onChangeText: () => void;
  onDelete: () => void;
}

const Todo: React.FC<Props> = ({
  todos,
  onCompleted,
  onEditPressed,
  onChangeText,
  onDelete,
}: Props) => {
  return (
    <Container>
      <LeftWrapper>
        <CheckBox isChecked={todos.iscompleted} onToggle={onCompleted} />
        <ListText numberOfLines={1} done={todos.iscompleted}>
          {todos.initialText}
        </ListText>
      </LeftWrapper>
      <RightWrapper>
        <TouchableOpacity onPress={onDelete}>
          <Image source={IC_TRASH} />
        </TouchableOpacity>
      </RightWrapper>
    </Container>
  );
};

export default Todo;
