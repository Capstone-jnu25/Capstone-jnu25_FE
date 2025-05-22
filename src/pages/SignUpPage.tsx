import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import CustomButton from "../components/CustomButton";
import Logo from "../components/Logo";
import CustomTextInput from "../components/CustomTextInput";

const SignUpPage = () => {
    const [univName, setUnivName] = useState("");      // 학교명 (선택값)
    const [email, setEmail] = useState("");            // 이메일 전체 입력값
    const [code, setCode] = useState("");              // 인증코드
    const [isVerified, setIsVerified] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [nickname, setNickname] = useState("");
    const [studentId, setStudentId] = useState("");


    // 🔵 인증코드 전송
    const handleSendCode = async () => {
        if (!univName || !email) {
        Alert.alert("오류", "학교와 이메일을 모두 입력하세요.");
        return;
        }

        try {
        const response = await fetch("https://univcert.com/api/v1/certify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                univName: univName,
                key: "63510cb5-3cc6-4777-bb6c-56d3753d6c31",  // ← 여기에 실제 키
                univ_check: true,
            }),
        });

        const data = await response.json();
        if (data.success) {
            Alert.alert("성공", "인증코드가 전송되었습니다.");
            } else {
            Alert.alert("실패", data.message || "인증코드 전송 실패");
            }
        } catch (error) {
            console.error("API 호출 에러:", error);
            Alert.alert("네트워크 오류", "잠시 후 다시 시도해주세요.");
        }
    };

    // ✅ 인증코드 확인
    const handleVerifyCode = async () => {
        try {
        const response = await fetch("https://univcert.com/api/v1/certifycode", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                code: code,
                key: "63510cb5-3cc6-4777-bb6c-56d3753d6c31",
            }),
        });

        const data = await response.json();
        if (data.success) {
            setIsVerified(true);
            Alert.alert("성공", "이메일 인증이 완료되었습니다.");
        } else {
            Alert.alert("실패", data.message || "인증코드가 올바르지 않습니다.");
        }
        } catch (error) {
        Alert.alert("네트워크 오류", "잠시 후 다시 시도해주세요.");
        }
    };

    return (
        <View style={styles.container}>
        <Logo />

        <CustomTextInput
            placeholder="학교 선택"
            value={univName}
            onChangeText={setUnivName}
        />

        <CustomTextInput
            placeholder="대학교 이메일 입력"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
        />
        <CustomButton title='코드 전송' onPress={handleSendCode}/>

        <View style={styles.checkPassWord}>
                <CustomTextInput
                    style={{ width: 140 }}
                    placeholder="인증코드 입력"
                    value={code}
                    onChangeText={setCode}
                />
                <TouchableOpacity style={styles.checkButton} onPress={handleVerifyCode}>
                    <Text style={styles.button}>확인</Text>
                </TouchableOpacity>
            </View>

        <CustomTextInput 
            placeholder="비밀번호" 
            secureTextEntry 
            value={password}
            onChangeText={setPassword}
        />

        <View style={styles.checkPassWord}>
                <CustomTextInput
                    style={{ width: 140 }}
                    placeholder="비밀번호 확인"
                    secureTextEntry
                    value={passwordConfirm}
                    onChangeText={setPasswordConfirm}
                />
                <TouchableOpacity style={styles.checkButton}>
                    <Text style={styles.button}>확인</Text>
                </TouchableOpacity>
            </View>

        <CustomTextInput 
            placeholder="닉네임"
            value={nickname}
            onChangeText={setNickname}
        />

        <CustomTextInput 
            placeholder="학번"
            keyboardType="numeric"
            value={studentId}
            onChangeText={setStudentId}
        />

        <CustomButton
            title="회원가입"
            onPress={() => {
            if (!isVerified) {
                Alert.alert("이메일 인증 필요", "이메일 인증을 완료해주세요.");
                return;
            }

            // TODO: 실제 회원가입 처리 (백엔드 API로 전송)
            Alert.alert("회원가입 성공", "이제 로그인이 가능합니다!");
            }}
        />
        </View>
    );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#C6E4FF",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    sendCodeButton: {
        backgroundColor: "#233b6d",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginVertical: 10,
    },
    sendCodeText: {
        color: "#fff",
        fontWeight: "bold",
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
});

export default SignUpPage;
