import React, {useState} from 'react';
import styled from '@emotion/native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {
  RootStackNavigatorProps,
  RootStackParamList,
} from '../navigations/RootStackNavigator';
import {RouteProp} from '@react-navigation/core';
import {getString} from '../../../STRINGS';

import {useTodos} from '../../providers/TodosProvider';
import SwitchToggle from 'react-native-switch-toggle';
import {useTheme} from '../../providers/ThemeProvider';
import {colors} from '../../theme';

const Container = styled(SafeAreaView)`
  flex: 1;
  align-self: stretch;

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  background: ${({theme}) => theme.background};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 90px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
`;

const HeaderTitle = styled.Text`
  font-size: 26px;
  font-family: ChauPhilomeneOne;
  color: ${({theme}) => theme.title};
`;

const Body = styled.View`
  flex: 1;
  justify-content: space-between;
  width: 100%;
`;

const TaskListContainer = styled.View`
  align-items: center;
  padding-top: 12px;
`;

const ListItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 380px;
  margin-top: 12px;
  margin-bottom: 12px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;

  border-radius: 20px;
  background-color: ${({theme}) => theme.listCard};
`;

const ListText = styled.Text`
  font-family: RobotoMediumItalic;
`;

const ListCount = styled.Text`
  margin-right: 30px;
`;

type Props = {
  navigation: RootStackNavigatorProps<'Home'>;
  route: RouteProp<RootStackParamList, 'Home'>;
};

const Home: React.FC<Props> = ({navigation}) => {
  const [themeToggle, setThemeToggle] = useState<boolean>(false);
  const {todos, highlightedTodos} = useTodos();
  const {changeThemeType} = useTheme();

  const handleThemeSwitch = (): void => {
    setThemeToggle((prev) => !prev);
    changeThemeType();
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>{getString('TODO_TITLE')}</HeaderTitle>
        <SwitchToggle
          containerStyle={{
            width: 48,
            height: 26,
            borderRadius: 25,
            padding: 5,
            marginRight: 15,
          }}
          circleStyle={{
            width: 18,
            height: 18,
            borderRadius: 19,
          }}
          backgroundColorOn={colors.grey_20}
          backgroundColorOff={colors.grey_40}
          switchOn={themeToggle}
          onPress={handleThemeSwitch}
          circleColorOff="grey"
          circleColorOn={colors.dark_blue}
          duration={300}
        />
      </Header>

      <Body>
        <TaskListContainer>
          <ListItem onPress={() => navigation.navigate('HighlightedList')}>
            <ListText>{getString('HIGHLIGHT')}</ListText>
            <ListCount>{highlightedTodos.length}</ListCount>
          </ListItem>
          <ListItem onPress={() => navigation.navigate('TodoList')}>
            <ListText>{getString('MY_LIST')}</ListText>
            <ListCount>{todos.length}</ListCount>
          </ListItem>
        </TaskListContainer>
      </Body>
    </Container>
  );
};

export default Home;
