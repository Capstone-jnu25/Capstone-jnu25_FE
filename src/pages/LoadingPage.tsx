import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";

const LoadingPage = ({ navigation }: any) => {
    useEffect(() => {
      setTimeout(() => {
        // 로딩이 끝나면 MainPage로 이동
        navigation.navigate('MainPage');
      }, 3000); // 3초 후 MainPage로 이동
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
                style={styles.locoImage}
                source={require('../assets/logo.png')}/>
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