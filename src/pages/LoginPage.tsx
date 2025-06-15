import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from '@react-native-firebase/messaging';
import CustomButton from '../components/CustomButton';
import Logo from '../components/Logo'
import CustomTextInput from "../components/CustomTextInput";
import CustomAlert from "../components/CustomAlert";

type LoginPageNavigationProp = StackNavigationProp<RootStackParamList, 'LoginPage'>;

const LoginPage = () => {
    const navigation = useNavigation<LoginPageNavigationProp>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            setAlertTitle("입력 오류");
            setAlertMessage("아이디와 비밀번호를 모두 입력하세요.");
            setAlertVisible(true);
            return;
        }

        try {
            const response = await axios.post("http://13.124.71.212:8080/api/users/login", {
                email,
                password,
            });
            console.log("🔐 로그인 응답 데이터:", response.data);

            const { token, userId, nickname, latitude, longitude } = response.data;
            

            await AsyncStorage.setItem("userId", userId.toString());
            await AsyncStorage.setItem("token", token);
            await AsyncStorage.setItem("latitude", latitude.toString());
            await AsyncStorage.setItem("longitude", longitude.toString());

            const fcmToken = await messaging().getToken();
            console.log("📱 현재 FCM 토큰:", fcmToken);
            

            // ✅ 서버의 기존 FCM 토큰과 비교
            try {
                const fcmCheckRes = await axios.get("http://13.124.71.212:8080/api/users/fcm-token", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const serverFcmToken = fcmCheckRes.data.data;

                if (fcmToken !== serverFcmToken) {
                    await axios.post("http://13.124.71.212:8080/api/users/fcm-token", {
                        fcmToken: fcmToken
                    }, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    console.log("✅ FCM 토큰 서버에 전송 완료");
                } else {
                    console.log("🟢 기존 토큰과 동일 - 전송 생략");
                }
            } catch (err: any) {
                    
}

            setAlertTitle("로그인 성공");
            setAlertMessage(`${nickname}님, 환영합니다!`);
            setAlertVisible(true);

            // 알림 닫히고 페이지 이동
            setTimeout(() => {
                setAlertVisible(false);
                navigation.navigate('LostPage');
            }, 1500);
        } catch (error: any) {
            console.error("❌ 로그인 실패:", error);
            if (error.response) {
                console.log("📛 서버 응답 오류:", error.response.data);
            } else if (error.request) {
                console.log("📡 서버 응답 없음:", error.request);
            } else {
                console.log("⚙️ 요청 설정 오류:", error.message);
            }

            setAlertTitle("로그인 실패");
            setAlertMessage("이메일 또는 비밀번호가 잘못되었거나, 서버 오류입니다.");
            setAlertVisible(true);
        }
    }

    return (
        <View style={styles.container}>
            <Logo/>

            <CustomTextInput
                placeholder="아이디"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <CustomTextInput
                placeholder="비밀번호"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <CustomButton title="로그인" onPress={handleLogin} />

            <Text style={styles.signUpText} onPress={()=>{navigation.navigate('SignUpPage')}}>회원가입</Text>
            <CustomAlert
                visible={alertVisible}
                title={alertTitle}
                message={alertMessage}
                onClose={() => setAlertVisible(false)}
                onConfirm={() => setAlertVisible(false)} 
            />
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