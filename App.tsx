import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './src/types';
import LoadingPage from './src/pages/LoadingPage';
import MainPage from './src/pages/MainPage';
import LoginPage from './src/pages/LoginPage';
import SignUpPage from './src/pages/SignUpPage';

import LostPage from './src/pages/LostPage';
import LostPostList from './src/pages/LostPostList';
import LostPostDetail from './src/pages/LostPostDetail';
import LostPostAdd from './src/pages/LostPostAdd';


import TradePage from './src/pages/TradePage';
import TradePostDetail from './src/pages/TradePostDetail';
import TradePostAdd from './src/pages/TradePostAdd';

import StudyPage from './src/pages/StudyPage';
import StudyPostAdd from './src/pages/StudyPostAdd';
import StudyPostDetail from './src/pages/StudyPostDetail';
import StudyApplicantList from './src/pages/StudyApplicantList';

import MeetPage from './src/pages/MeetPage';
import MeetPostAdd from './src/pages/MeetPostAdd';
import MeetApplicantList from './src/pages/MeetApplicantList';

import NotificationPage from './src/pages/NotificationPage';
import MyPage from './src/pages/MyPage';
import KeywordPage from './src/pages/KeywordPage';
import EditProfile from './src/pages/EditProfile';
import GroupPage from './src/pages/GroupPage';
import ChatList from './src/pages/ChatList';
import ChatPage from './src/pages/ChatPage';


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
        <Stack.Screen name="LostPostList">
          {(props) => <LostPostList {...props} currentTab={currentTab} setCurrentTab={setCurrentTab} />}
        </Stack.Screen>
        <Stack.Screen name="LostPostDetail">
          {(props) => <LostPostDetail {...props} currentTab={currentTab} setCurrentTab={setCurrentTab} />}
        </Stack.Screen>
        <Stack.Screen name="LostPostAdd">
          {(props) => <LostPostAdd {...props} currentTab={currentTab} setCurrentTab={setCurrentTab} />}
        </Stack.Screen>
        <Stack.Screen name="NotificationPage">
          {(props) => <NotificationPage {...props} currentTab={currentTab} setCurrentTab={setCurrentTab} />}
        </Stack.Screen>
        <Stack.Screen name="TradePostDetail">
          {(props) => <TradePostDetail {...props} currentTab={currentTab} setCurrentTab={setCurrentTab} />}
        </Stack.Screen>
        <Stack.Screen name="TradePostAdd">
          {(props) => <TradePostAdd {...props} currentTab={currentTab} setCurrentTab={setCurrentTab} />}
        </Stack.Screen>
        <Stack.Screen name="MyPage">
          {(props) => <MyPage {...props} currentTab={currentTab} setCurrentTab={setCurrentTab} />}
        </Stack.Screen>
        <Stack.Screen name="KeywordPage">
          {(props) => <KeywordPage {...props} currentTab={currentTab} setCurrentTab={setCurrentTab} />}
        </Stack.Screen>
        <Stack.Screen name="EditProfile">
          {(props) => <EditProfile {...props} currentTab={currentTab} setCurrentTab={setCurrentTab} />}
        </Stack.Screen>
        <Stack.Screen name="GroupPage">
          {(props) => <GroupPage {...props} currentTab={currentTab} setCurrentTab={setCurrentTab} />}
        </Stack.Screen>
        <Stack.Screen name="StudyPostAdd">
          {(props) => <StudyPostAdd {...props} currentTab={currentTab} setCurrentTab={setCurrentTab} />}
        </Stack.Screen>
        <Stack.Screen name="MeetPostAdd">
          {(props) => <MeetPostAdd {...props} currentTab={currentTab} setCurrentTab={setCurrentTab} />}
        </Stack.Screen>
        <Stack.Screen name="StudyPostDetail">
          {(props) => <StudyPostDetail {...props} currentTab={currentTab} setCurrentTab={setCurrentTab} />}
        </Stack.Screen>
        <Stack.Screen name="ChatList">
          {(props) => <ChatList {...props} currentTab={currentTab} setCurrentTab={setCurrentTab} />}
        </Stack.Screen>
        <Stack.Screen name="ChatPage">
          {(props) => <ChatPage {...props} currentTab={currentTab} setCurrentTab={setCurrentTab} />}
        </Stack.Screen>
        <Stack.Screen name="StudyApplicantList">
          {(props) => <StudyApplicantList {...props} currentTab={currentTab} setCurrentTab={setCurrentTab} />}
        </Stack.Screen>
        <Stack.Screen name="MeetApplicantList">
          {(props) => <MeetApplicantList {...props} currentTab={currentTab} setCurrentTab={setCurrentTab} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
