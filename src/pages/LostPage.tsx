import React, {useState} from "react";
import { View, StyleSheet } from "react-native";
import MenuBar from '../components/MenuBar';

const LostPage = () => {
    const [currentTab, setCurrentTab] = useState('Lost');
    return (
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
            
            </View>
            <MenuBar currentTab={currentTab} onTabPress={setCurrentTab} />
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
  });

export default LostPage;