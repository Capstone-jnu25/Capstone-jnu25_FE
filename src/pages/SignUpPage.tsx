import React from "react";
import { View, StyleSheet } from "react-native";
import CustomButton from '../components/CustomButton';
import Logo from '../components/Logo'
import CustomTextInput from "../components/CustomTextInput";

const SignUpPage = () => {
    return (
        <View style={styles.container}>
            <Logo/>
            <CustomTextInput
                placeholder="학교 선택" 
            />
            <CustomTextInput
                placeholder="아이디" 
            />
            <CustomTextInput
                placeholder="비밀번호"
                secureTextEntry={true}
            />
            <CustomTextInput
                placeholder="비밀번호 확인"
                secureTextEntry={true}
            />
            <CustomTextInput
                placeholder="닉네임"
            />

            <CustomButton title="회원가입" onPress={() => {}}/>
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
})

export default SignUpPage;