import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    LoadingPage: undefined;
    MainPage: undefined;
    LoginPage: undefined;
    SignUpPage: undefined;
    LostPage: undefined;
    TradePage: undefined;
    StudyPage: undefined;
    MeetPage: undefined;

    LostPostList: undefined;
    LostPostDetail: undefined;
    LostPostAdd: undefined;
    
    TradePostDetail: undefined;
    TradePostAdd: undefined;
    
    StudyPostAdd: undefined;
    StudyPostDetail: undefined;
    StudyApplicantList: undefined;

    MeetPostAdd: undefined;
    MeetApplicantList: undefined;

    NotificationPage: undefined;
    MyPage: undefined;
    KeywordPage: undefined;
    EditProfile: undefined;
    GroupPage: undefined;
    TheOtherPersonPage: undefined;

    ChatList: undefined;
    ChatPage: undefined;
  };

export type NavigationProp = StackNavigationProp<RootStackParamList>;

export type TabProps = {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
};
