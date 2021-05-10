import styled from '@emotion/native';
import React from 'react';
import {Image} from 'react-native';
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

const ListText = styled.Text`
  font-size: 12px;
  font-family: ChauPhilomeneOne;
  color: ${({theme}) => theme.subText};

  margin-left: 10px;
`;

const LeftWrapper = styled.View`
  flex-direction: row;
  align-items: center;

  overflow: hidden;
`;

const RightWrapper = styled.TouchableOpacity``;

interface Props {
  isClicked: boolean;
  text: string;
  onToggle: () => void;
}

const Task: React.FC<Props> = ({text, isClicked, onToggle}) => {
  return (
    <Container>
      <LeftWrapper>
        <CheckBox onToggle={onToggle} isChecked={isClicked} />
        <ListText>{text}</ListText>
      </LeftWrapper>
      <RightWrapper>
        <Image source={IC_TRASH} />
      </RightWrapper>
    </Container>
  );
};

export default Task;
