import React from 'react';
import {
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';

import {SvgCheck} from '../../utils/Icons';
import styled from '@emotion/native';

const Container = styled.View`
  height: 24px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const StyledCheck = styled.View`
  height: 20px;
  width: 20px;
  border-width: 1px;
  border-color: #000000;

  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  font-size: 14px;
  margin-left: 8px;
`;

interface Props {
  containerStyle?: ViewStyle;
  checkStyle?: ViewStyle;
  textStyle?: TextStyle;
  onToggle?: () => void;
  isChecked?: boolean;
  text?: string;
  checkColor?: string;
  activeColor?: string;
  inActiveColor?: string;
  backgroundColor?: string;
}

export const CheckBox: React.FC<Props> = (props: Props) => {
  const {
    containerStyle,
    checkStyle,
    checkColor,
    activeColor,
    inActiveColor,
    backgroundColor,
    text = '',
    textStyle,
    isChecked = false,
    onToggle,
  } = props;

  return (
    <Container style={containerStyle}>
      <TouchableOpacity style={{flexDirection: 'row'}} onPress={onToggle}>
        <StyledCheck
          style={[
            checkStyle,
            {
              backgroundColor: isChecked ? activeColor : backgroundColor,
              borderColor: inActiveColor,
            },
          ]}>
          {isChecked ? (
            <SvgCheck width={14} height={14} fill={checkColor} />
          ) : null}
        </StyledCheck>
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={onToggle}>
        <StyledText style={textStyle}>{text}</StyledText>
      </TouchableWithoutFeedback>
    </Container>
  );
};
