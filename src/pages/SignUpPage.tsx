import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    FlatList
} from "react-native";
import { TabProps, NavigationProp } from "../types";
import axios from "axios";
import CustomButton from "../components/CustomButton";
import Logo from "../components/Logo";
import CustomTextInput from "../components/CustomTextInput";
import CustomAlert from "../components/CustomAlert";

const SignUpPage = () => {
    const navigation = useNavigation<NavigationProp>();
    
    const [univName, setUnivName] = useState("");      
    const [email, setEmail] = useState("");            
    const [code, setCode] = useState("");              
    const [isVerified, setIsVerified] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [nickname, setNickname] = useState("");
    const [studentId, setStudentId] = useState("");
    const [schoolSuggestions, setSchoolSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const fetchSchoolSuggestions = async (keyword: string) => {
        if (!keyword) {
            setSchoolSuggestions([]);
            return;
        }

        try {
            const response = await axios.get("https://www.career.go.kr/cnet/openapi/getOpenApi", {
                params: {
                    apiKey: "de9825b1c596b2bcd0cbbe3c166b0b08", 
                    type: "json",
                    svcType: "api",
                    svcCode: "SCHOOL",
                    contentType: "json",
                    gubun: "univ_list",
                    searchSchulNm: keyword,
                },
            });

            const results = response.data.dataSearch?.content || [];
            const names: string[]= results.map((item: any) => item.schoolName);
            const uniqueNames: string[] = Array.from(new Set(names));
            setSchoolSuggestions(uniqueNames);
            setShowSuggestions(true);
        } catch (error) {
            console.error("학교 검색 에러:", error);
            setSchoolSuggestions([]);
            setShowSuggestions(false);
        }
    };

    // 인증코드 전송
    const handleSendCode = async () => {
    if (!univName || !email) {
        setAlertTitle("오류");
        setAlertMessage("학교와 이메일을 모두 입력하세요.");
        setAlertVisible(true);
        return;
    }

    try {
        await axios.post("http://13.124.71.212:8080/api/users/verify-email", {
            "email": email,
            "univName": univName,
        });

        setAlertTitle("성공");
        setAlertMessage("인증코드가 전송되었습니다.");
        setAlertVisible(true);
    } catch (error: any) {
            console.error("🔥 인증 요청 실패!", error);
        if (error.response) {
            console.log("📦 서버 응답 있음", error.response);
        } else if (error.request) {
            console.log("📡 서버 응답 없음, 요청은 전송됨", error.request);
        } else {
            console.log("❌ 에러 설정 자체 문제", error.message);
        }

        setAlertTitle("실패");
        setAlertMessage("인증 요청 중 문제가 발생했습니다. (Network)");
        setAlertVisible(true);
    } 
    };


    const handleUnivNameChange = (text: string) => {
        setUnivName(text);
        fetchSchoolSuggestions(text);
    };

        // 인증코드 확인
    const handleVerifyCode = async () => {
    try {
        await axios.post("http://13.124.71.212:8080/api/users/verify-code", {
            "email": email,
            "univName":univName,
            "code": code,
        },{
    headers: {
      "Content-Type": "application/json",
    },
  });

        setIsVerified(true);
        setAlertTitle("성공");
        setAlertMessage("이메일 인증이 완료되었습니다.");
    } catch (error: any) {
        console.error("🔥 인증 요청 실패!", error);
        setAlertTitle("실패");
        setAlertMessage(error.response?.data?.message || "인증코드가 올바르지 않습니다.");
    }
    setAlertVisible(true);
    };


    const checkPasswordMatch = () => {
        if (password === passwordConfirm) {
            setAlertTitle("확인");
            setAlertMessage("비밀번호가 일치합니다.");
        } else {
            setAlertTitle("오류");
            setAlertMessage("비밀번호가 일치하지 않습니다.");
        }
        setAlertVisible(true);
    };

    return (
        <View style={styles.container}>
            <Logo />

            <CustomTextInput
                placeholder="학교 입력"
                value={univName}
                onChangeText={handleUnivNameChange}
            />

            {showSuggestions && schoolSuggestions.length > 0 && (
                <FlatList
                    data={schoolSuggestions}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.suggestionList}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setUnivName(item);
                                setSchoolSuggestions([]);
                                setShowSuggestions(false);
                            }}
                            style={styles.suggestionItem}
                        >
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}

            <CustomTextInput
                placeholder="대학교 이메일 입력"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <CustomButton title='코드 전송' onPress={handleSendCode} />

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
                <TouchableOpacity style={styles.checkButton} onPress={checkPasswordMatch}>
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
                onPress={async() => {
                    if (!isVerified) {
                        setAlertTitle("이메일 인증 필요");
                        setAlertMessage("이메일 인증을 완료해주세요.");
                        setAlertVisible(true);
                        return;
                    }
                    

                        setAlertTitle("회원가입 성공");
                        setAlertMessage(`${nickname}님, 환영합니다!`);

                setAlertVisible(true);
                setTimeout(() => {
                    navigation.navigate("LoginPage");
                }, 1500);

                }}
            />

            <CustomAlert
                visible={alertVisible}
                title={alertTitle}
                message={alertMessage}
                onClose={() => setAlertVisible(false)}
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
    checkPassWord: {
        flexDirection: 'row',
        alignItems: 'center',
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
        marginLeft: 5,
    },
    button: {
        color: '#FF5659',
        fontSize: 14,
    },
    suggestionList: {
        position: 'absolute',
        top: 350,
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 20,
        zIndex: 999,
        maxHeight: 150,
        width: 200,
    },
    suggestionItem: {
        padding: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
});

export default SignUpPage;