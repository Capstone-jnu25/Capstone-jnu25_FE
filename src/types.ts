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
    StudyPostDetail: { postId: number };
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
    ChatPage: { chattingRoomId: number; chatTitle: string };
  };

export type NavigationProp = StackNavigationProp<RootStackParamList>;

export type TabProps = {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
};

export type LostPost = {
  id: number;
  title: string;
  content: string;
  location: string;
  image: string | { uri: string };
  time: string;
};

export type TradePost = {
  id: number;
  title: string;
  content: string;
  price: number;
  image: string | { uri: string };
  time: string;
};

export type Post = {
  postId: number;
  title: string;
  contents: string;
  place: string;
  time: string;
  dueDate: string;
  gender: string;
  maxParticipants: number;
  currentParticipants: number;
  boardType: string;
  closed: boolean;
  dday: string;
};