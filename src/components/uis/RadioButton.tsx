import styled from '@emotion/native';
import React from 'react';
import {ViewStyle} from 'react-native';
import {colors} from '../../theme';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Button = styled.TouchableOpacity`
  height: 20px;
  width: 20px;
  background-color: ${() => colors.grey_10};
  border-radius: 10px;
  border-width: 1px;
  border-color: ${() => colors.dark};
  align-items: center;
  justify-content: center;
`;

const Icon = styled.View`
  height: 14px;
  width: 14px;
  border-radius: 7px;
  background-color: ${() => colors.dark};
`;

type Props = {
  value: string;
  containerStyle?: ViewStyle;
  iconStyle?: ViewStyle;
  selectedValue: string;
  onPress: () => void;
};

const RadioButton: React.FC<Props> = ({
  value,
  containerStyle,
  iconStyle,
  selectedValue,
  onPress,
}) => {
  const handleChecked = (callback: () => void): void => {
    callback();
  };

  return (
    <Container style={containerStyle}>
      <Button onPress={() => handleChecked(onPress)}>
        {value === selectedValue ? <Icon style={iconStyle} /> : null}
      </Button>
    </Container>
  );
};

export default RadioButton;
