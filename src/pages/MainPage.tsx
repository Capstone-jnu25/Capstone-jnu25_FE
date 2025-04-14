import React from "react";
import { View, StyleSheet } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '../components/CustomButton';
import Logo from '../components/Logo'

type MainPageNavigationProp = StackNavigationProp<RootStackParamList, 'MainPage'>;

const MainPage = () => {
    const navigation = useNavigation<MainPageNavigationProp>();

    return (
            <View style={styles.container}>
                <Logo />
                <CustomButton title="로그인" onPress={() => navigation.navigate('LoginPage')} style={styles.button} />
                <CustomButton title="회원가입" onPress={() => navigation.navigate('SignUpPage')} style={styles.button} />
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