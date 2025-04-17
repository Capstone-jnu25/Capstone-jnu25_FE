import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '../components/CustomButton';
import Logo from '../components/Logo'
import CustomTextInput from "../components/CustomTextInput";

type LoginPageNavigationProp = StackNavigationProp<RootStackParamList, 'LoginPage'>;
const LoginPage = () => {
    const navigation = useNavigation<LoginPageNavigationProp>();
    
    return (
        <View style={styles.container}>
            <Logo/>

            <CustomTextInput
                placeholder="아이디" 
            />
            <CustomTextInput
                placeholder="비밀번호"
                secureTextEntry={true}
            />

            <CustomButton title="로그인" onPress={() => navigation.navigate('LostPage')}/>

            <Text style={styles.signUpText} onPress={()=>{navigation.navigate('SignUpPage')}}>회원가입</Text>
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
    signUpText: {
        color: '#2D7DD2', // 회원가입 텍스트 색상
        fontSize: 12,
    }
})

export default LoginPage;