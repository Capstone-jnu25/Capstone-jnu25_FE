import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Logo from '../components/Logo'

const LoadingPage = ({ navigation }: any) => {
    useEffect(() => {
      setTimeout(() => {
        navigation.navigate('MainPage');
      }, 3000); 
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