import React from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../pages/Home';
import TodoList from '../pages/TodoList';
import HighlightedList from '../pages/HighlightedList';

export type RootStackParamList = {
  Home: undefined;
  HighlightedList: undefined;
  TodoList: undefined;
};

export type RootStackNavigatorProps<
  T extends keyof RootStackParamList
> = StackNavigationProp<RootStackParamList, T>;

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="TodoList" component={TodoList} />
        <Stack.Screen name="HighlightedList" component={HighlightedList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
