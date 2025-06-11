import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Logo from '../components/Logo'
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoadingPage = ({ navigation }: any) => {
    useEffect(() => {
  const checkLogin = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      navigation.replace('LostPage');  // 로그인 상태
    } else {
      navigation.replace('MainPage'); // 비로그인 상태
    }
  };

  setTimeout(() => {
    checkLogin();
  }, 3000);  // 스플래시 시간은 자유롭게
}, [navigation]);

    return (
        <View style={styles.container}>
            <Logo />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems : 'center',
        backgroundColor : '#C6E4FF'
    },
    locoImage:{
        width: 235,
        height: 307
    }
})

export default LoadingPage;