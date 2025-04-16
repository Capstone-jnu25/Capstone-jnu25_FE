import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './src/types';
import LoadingPage from './src/pages/LoadingPage';
import MainPage from './src/pages/MainPage';
import LoginPage from './src/pages/LoginPage';
import SignUpPage from './src/pages/SignUpPage';
import LostPage from './src/pages/LostPage';
import TradePage from './src/pages/TradePage';
import StudyPage from './src/pages/StudyPage';
import MeetPage from './src/pages/MeetPage';


const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('LostPage');

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoadingPage" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoadingPage" component={LoadingPage} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="SignUpPage" component={SignUpPage} />
        <Stack.Screen name="LostPage">
          {(props) => <LostPage {...props} currentTab={currentTab} setCurrentTab={setCurrentTab} />}
        </Stack.Screen>
        <Stack.Screen name="TradePage">
          {(props) => <TradePage {...props} currentTab={currentTab} setCurrentTab={setCurrentTab} />}
        </Stack.Screen>
        <Stack.Screen name="StudyPage">
          {(props) => <StudyPage {...props} currentTab={currentTab} setCurrentTab={setCurrentTab} />}
        </Stack.Screen>
        <Stack.Screen name="MeetPage">
          {(props) => <MeetPage {...props} currentTab={currentTab} setCurrentTab={setCurrentTab} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
