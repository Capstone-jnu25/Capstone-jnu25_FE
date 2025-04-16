import React from "react";
import { View, StyleSheet } from "react-native";
import { NaverMapView } from  '@mj-studio/react-native-naver-map';
import { NavigationProp, TabProps } from "../types";
import { useNavigation } from '@react-navigation/native';
import MenuBar from '../components/MenuBar';
import CircleButton from "../components/CircleButton";

type LostPageProps = {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
};

const INITIAL_CAMERA = {
  latitude: 37.5666102,  // 서울 중심부 위도
  longitude: 126.9783881,  // 서울 중심부 경도
  zoom: 12,  // 줌 레벨
};

<<<<<<< HEAD
const LostPage: React.FC<LostPageProps> = ({ currentTab, setCurrentTab }) => {
=======
const LostPage: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
<<<<<<< HEAD
>>>>>>> e116bcd (feat: MeunBar 화면 전환)
=======
    const navigation = useNavigation<NavigationProp>();

>>>>>>> 72a0b97 (feat: LostPostList 작성)
    return (
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
            <NaverMapView
              style={{ width: '100%', height: '100%' }}
              initialCamera={INITIAL_CAMERA}
            />
            <View style={styles.buttonContainer}>
              <CircleButton iconName="notifications-outline" onPress={() => {}} />
              <CircleButton iconName="list" onPress={() => {navigation.navigate('LostPostList');}} />
            </View>

            </View>
            <MenuBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </View> 
    )
}

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: 'flex-end', // 하단 메뉴바를 화면 아래에 고정
    },
    contentContainer: {
      flex: 1, // 텍스트는 위에 배치
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      marginBottom: 20, // 하단 메뉴바와의 간격
    },
    buttonContainer: {
      position: 'absolute',
      top: 20,
      right: 20,
      flexDirection: 'row',
      gap: 10,
    }
  });

export default LostPage;