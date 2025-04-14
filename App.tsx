import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './src/types';
import LoadingPage from './src/pages/LoadingPage';
import MainPage from './src/pages/MainPage';
import LoginPage from './src/pages/LoginPage';
import SignUpPage from './src/pages/SignUpPage';


const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoadingPage" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoadingPage" component={LoadingPage} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="SignUpPage" component={SignUpPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
