export type RootStackParamList = {
    LoadingPage: undefined;
    MainPage: undefined;
    LoginPage: undefined;
    SignUpPage: undefined;
    LostPage: undefined;
    TradePage: undefined;
    StudyPage: undefined;
    MeetPage: undefined;
  };

export type TabProps = {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
};
