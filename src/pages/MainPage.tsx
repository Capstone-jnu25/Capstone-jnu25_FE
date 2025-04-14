import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Button from '../components/Button';

const MainPage = () => {

    return (
            <View style={styles.container}>
                <Image
                    style={styles.locoImage}
                    source={require('../assets/logo.png')}/>
                <Button title="로그인" onPress={() => {}} style={styles.button} />
                <Button title="회원가입" onPress={() => {}} style={styles.button} />
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
    },
    button: {
        marginBottom: 20,
      },
})

export default MainPage;