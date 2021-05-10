import React, {useState} from 'react';
import styled from '@emotion/native';
import {Image, ScrollView, TouchableOpacity} from 'react-native';
import Task from '../uis/Task';

const Container = styled.View`
  flex: 1;
  align-self: stretch;

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  padding-top: 35px;
`;

const TitleWrapper = styled.View`
  width: 335px;
  flex-direction: row;
  justify-content: center;
  margin-top: 35px;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 36px;
  line-height: 49px;
  font-family: ChauPhilomeneOne;
`;

const TextInputWrapper = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  align-self: center;
`;

const StyledTextInput = styled.TextInput`
  height: 40px;
  width: 268px;
`;

const ListWrapper = styled.View`
  width: 300px;
  margin-top: 40px;
`;

const ListTitle = styled.Text`
  font-size: 18px;
  line-height: 25px;
  margin-bottom: 20px;
`;

const Home: React.FC = () => {
  const [value, setValue] = useState<string>('');

  return (
    <Container>
      <TitleWrapper>
        <Title>What's your plan?</Title>
      </TitleWrapper>
      <TextInputWrapper>
        <StyledTextInput
          value={value}
          onChangeText={(text) => setValue(text)}
        />
      </TextInputWrapper>
      <ListWrapper>
        <ListTitle>Upcoming To-do's</ListTitle>
        <ScrollView>
          <Task />
          <Task />
        </ScrollView>
      </ListWrapper>
    </Container>
  );
};

export default Home;
