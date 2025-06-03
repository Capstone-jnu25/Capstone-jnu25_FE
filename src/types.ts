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
    LostPostDetail: { postId: number };
    LostPostAdd: undefined;
    
    TradePostDetail: { postId: number };
    TradePostAdd: undefined;
    
    StudyPostAdd: undefined;
    StudyPostDetail: undefined;
    StudyApplicantList: { postId: number };

    MeetPostAdd: undefined;
    MeetApplicantList: { postId: number };

    NotificationPage: undefined;
    MyPage: undefined;
    KeywordPage: undefined;
    EditProfile: undefined;
    GroupPage: undefined;
    TheOtherPersonPage: undefined;
    MyPostPage: undefined;

    ChatList: undefined;
    ChatPage: undefined;
  };

export type NavigationProp = StackNavigationProp<RootStackParamList>;

export type TabProps = {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  location: string;
  image: string | { uri: string };
  time: string;
};