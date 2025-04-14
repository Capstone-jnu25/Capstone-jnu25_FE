import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Button from '../components/Button';
import Logo from '../components/Logo'

const LoginPage = () => {
    return (
        <View style={styles.container}>
            <Logo/>

            <TextInput
                style={styles.input}
                placeholder="아이디" 
                placeholderTextColor="#D2D2D2" // 회색 텍스트
                textAlign="center" // 텍스트 가운데 정렬
            />

            <TextInput
                style={styles.input}
                placeholder="비밀번호"
                secureTextEntry={true} 
                placeholderTextColor="#D2D2D2" 
                textAlign="center" 
            />

            <Button title="로그인" onPress={() => {}}/>
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
    input: {
        backgroundColor: '#fff',
        height: 40,
        borderColor: '#95CEFF',
        borderWidth: 3,
        width: 200,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
      },
})

export default LoginPage;