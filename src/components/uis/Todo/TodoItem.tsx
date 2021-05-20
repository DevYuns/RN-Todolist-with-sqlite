import styled from '@emotion/native';
import React, {useState} from 'react';
import {Modal, TouchableOpacity, Animated} from 'react-native';
import {CheckBox} from '../Checkbox';
import EditTodoModal from './EditTodoModal';
import type {TodoType} from '../../../utils/database';
import {Swipeable} from 'react-native-gesture-handler';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 350px;
  height: 50px;
  margin-top: 5px;

  padding: 10px;
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

const StyledAnimatedView = styled(Animated.View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 60px;
  background-color: ${({theme}) => theme.delete};
`;

interface Props {
  todoIdx: number;
  todoMap: Map<number, Swipeable>;
  todoItem: TodoType;
  toggleComplete: () => void;
  onEdit: (item: TodoType, str: string) => void;
  onDelete: () => void;
}

const TodoItem: React.FC<Props> = ({
  todoIdx,
  todoMap,
  todoItem,
  toggleComplete,
  onEdit: handleEdit,
  onDelete: handleDelete,
}) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const renderSwipeBtn = (
    dragX: Animated.AnimatedInterpolation,
  ): React.ReactElement => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.9],
      extrapolate: 'clamp',
    });

    const opacity = dragX.interpolate({
      inputRange: [-100, -20, 0],
      outputRange: [1, 0.9, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity onPress={handleDelete}>
        <StyledAnimatedView style={{opacity}}>
          <Animated.Text
            style={{color: 'white', fontWeight: '800', transform: [{scale}]}}>
            Delete
          </Animated.Text>
        </StyledAnimatedView>
      </TouchableOpacity>
    );
  };

  return (
    <>
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
      <Swipeable
        ref={(ref) => {
          if (ref && !todoMap.get(todoIdx)) todoMap.set(todoIdx, ref);
        }}
        renderRightActions={(_, dragX) => renderSwipeBtn(dragX)}
        onSwipeableWillOpen={() => {
          [...todoMap.entries()].forEach(([key, ref]) => {
            if (ref && key !== todoIdx) ref.close();
          });
        }}>
        <Container>
          <LeftWrapper>
            <CheckBox
              isChecked={todoItem.isCompleted}
              onToggle={toggleComplete}
            />
            <TouchableOpacity onPress={() => setModalVisible((prev) => !prev)}>
              <ListText numberOfLines={1} done={todoItem.isCompleted}>
                {todoItem.text}
              </ListText>
            </TouchableOpacity>
          </LeftWrapper>
        </Container>
      </Swipeable>
    </>
  );
};

export {TodoItem};
