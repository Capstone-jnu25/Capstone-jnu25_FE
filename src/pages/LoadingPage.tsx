import React from "react";
import { View, Image, StyleSheet } from "react-native";

const LoadingPage = () => {

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
        width: 335,
        height: 407
    }
})

export default LoadingPage;