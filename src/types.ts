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
    NotificationPage: undefined;
    TradePostDetail: undefined;
    TradePostAdd: undefined;
    MyPage: undefined;
    KeywordPage: undefined;
    EditProfile: undefined;
    GroupPage: undefined;
  };

export type NavigationProp = StackNavigationProp<RootStackParamList>;

export type TabProps = {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
};
