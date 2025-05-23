import React, { useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    FlatList
} from "react-native";
import axios from "axios";
import CustomButton from "../components/CustomButton";
import Logo from "../components/Logo";
import CustomTextInput from "../components/CustomTextInput";
import CustomAlert from "../components/CustomAlert";

const SignUpPage = () => {
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

    const handleSendCode = async () => {
        if (!univName || !email) {
            setAlertTitle("오류");
            setAlertMessage("학교와 이메일을 모두 입력하세요.");
            setAlertVisible(true);
            return;
        }

        try {
            const response = await axios.post("https://univcert.com/api/v1/certify", {
                email: email,
                univName: univName,
                key: "63510cb5-3cc6-4777-bb6c-56d3753d6c31",
                univ_check: true,
            });

            if (response.data.success) {
                setAlertTitle("성공");
                setAlertMessage("인증코드가 전송되었습니다.");
            } else {
                setAlertTitle("실패");
                setAlertMessage(response.data.message || "인증코드 전송 실패");
            }
            setAlertVisible(true);
        } catch (error) {
            console.error("API 호출 에러:", error);
            setAlertTitle("네트워크 오류");
            setAlertMessage("잠시 후 다시 시도해주세요.");
            setAlertVisible(true);
        }
    };

    const handleUnivNameChange = (text: string) => {
        setUnivName(text);
        fetchSchoolSuggestions(text);
    };

    const handleVerifyCode = async () => {
        try {
            const response = await axios.post("https://univcert.com/api/v1/certifycode", {
                email: email,
                code: code,
                key: "63510cb5-3cc6-4777-bb6c-56d3753d6c31",
            });

            if (response.data.success) {
                setIsVerified(true);
                setAlertTitle("성공");
                setAlertMessage("이메일 인증이 완료되었습니다.");
            } else {
                setAlertTitle("실패");
                setAlertMessage(response.data.message || "인증코드가 올바르지 않습니다.");
            }
            setAlertVisible(true);
        } catch (error) {
            setAlertTitle("네트워크 오류");
            setAlertMessage("잠시 후 다시 시도해주세요.");
            setAlertVisible(true);
        }
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
                onPress={() => {
                    if (!isVerified) {
                        setAlertTitle("이메일 인증 필요");
                        setAlertMessage("이메일 인증을 완료해주세요.");
                        setAlertVisible(true);
                        return;
                    }
                    setAlertTitle("회원가입 성공");
                    setAlertMessage("이제 로그인이 가능합니다!");
                    setAlertVisible(true);
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