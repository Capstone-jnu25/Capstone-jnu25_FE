import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
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
            <View style={styles.checkPassWord}>
                <CustomTextInput
                    style={{ width: 140 }}
                    placeholder="비밀번호 확인"
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.checkButton}>
                    <Text style={styles.button}>확인</Text>
                </TouchableOpacity>
            </View>
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
    checkPassWord: {
        flexDirection: 'row', // 텍스트 입력란과 버튼을 수평으로 배치
        alignItems: 'center', // 세로 중앙 정렬
    },
    checkButton: {
        backgroundColor: '#fff',
        height: 40,
        borderColor: '#FF5659',
        borderWidth: 3,
        width: 50,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginLeft:5,
    },
    button: {
        color: '#FF5659', // 텍스트 색상을 흰색으로 설정
        fontSize: 14, // 텍스트 크기 설정
    }
})

export default SignUpPage;