import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    FlatList,
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

    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [schoolSuggestions, setSchoolSuggestions] = useState<{ name: string; address: string }[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const fetchAddressAndCoords = async (schoolName: string) => {
        try {
            let address = "";

            if (schoolName === "전남대학교") {
            address = "광주광역시 북구 용봉로 77";
            } else {
            const res = await axios.get("https://www.career.go.kr/cnet/openapi/getOpenApi", {
                params: {
                apiKey: "de9825b1c596b2bcd0cbbe3c166b0b08",
                svcType: "api",
                svcCode: "SCHOOL",
                contentType: "json",
                gubun: "univ_list",
                searchSchulNm: schoolName,
                },
            });

            const contentList = res.data.dataSearch?.content || [];
            const content = contentList.find(
                (item: any) => item.schoolName === schoolName && !item.adres.includes("여수")
            );

            if (!content?.adres) throw new Error("주소를 찾을 수 없습니다.");
            address = content.adres;
            }

            console.log("📍 변환된 학교 주소:", address);

            const geoRes = await axios.get("https://dapi.kakao.com/v2/local/search/address.json", {
            params: { query: address },
            headers: {
                Authorization: "KakaoAK f958d2a57846011e2462194fb63cd48c",
            },
            });

            const geoData = geoRes.data.documents?.[0];
            if (!geoData) throw new Error("좌표 데이터를 찾을 수 없습니다.");

            console.log("📍 위도:", geoData.y, "경도:", geoData.x);

            setLatitude(parseFloat(geoData.y));
            setLongitude(parseFloat(geoData.x));
        } catch (err) {
            console.error("주소/좌표 변환 오류:", err);
            setLatitude(null);
            setLongitude(null);
        }
        };


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

            const seen = new Set<string>();
            const suggestions: { name: string; address: string }[] = [];

            for (const item of results) {
                if (!seen.has(item.schoolName)) {
                    seen.add(item.schoolName);
                    suggestions.push({ name: item.schoolName, address: item.adres });
                }
            }

            setSchoolSuggestions(suggestions);
            setShowSuggestions(true);
        } catch (error) {
            console.error("학교 검색 에러:", error);
            setSchoolSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleUnivNameChange = (text: string) => {
        setUnivName(text);
        setLatitude(null);
        setLongitude(null);
        setShowSuggestions(true);

        if (text.length >= 2) {
            fetchSchoolSuggestions(text);
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
            await axios.post("http://13.124.71.212:8080/api/users/verify-email", {
                email,
                univName,
            });

            setAlertTitle("성공");
            setAlertMessage("인증코드가 전송되었습니다.");
            setAlertVisible(true);
        } catch (error: any) {
            console.error("🔥 인증 요청 실패!", error);
            setAlertTitle("실패");
            setAlertMessage("인증 요청 중 문제가 발생했습니다. (Network)");
            setAlertVisible(true);
        } 
    };

    const handleVerifyCode = async () => {
        try {
            await axios.post("http://13.124.71.212:8080/api/users/verify-code", {
                email,
                univName,
                code,
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

    const handleSignUp = async () => {
    // 필수 입력값 체크
    if (!univName || !email || !password || !nickname || !studentId) {
        setAlertTitle("입력 오류");
        setAlertMessage("모든 항목을 빠짐없이 입력해주세요.");
        setAlertVisible(true);
        return;
    }

    if (password !== passwordConfirm) {
        setAlertTitle("비밀번호 불일치");
        setAlertMessage("비밀번호가 일치하지 않습니다.");
        setAlertVisible(true);
        return;
    }

    if (latitude === null || longitude === null) {
            setAlertTitle("학교 위치 정보 없음");
            setAlertMessage("학교 주소로부터 위치 정보를 불러오지 못했습니다.");
            setAlertVisible(true);
            return;
        }

    try {
        // 이메일 인증 상태 확인
        const verifyRes = await axios.post("http://13.124.71.212:8080/api/users/email/status", { email });

        if (verifyRes.data.message.includes("인증되어")) {
            const payload = {
                univName,
                latitude,
                longitude,
                email,
                password,
                nickname,
                studentNum: parseInt(studentId),
            };

            console.log("🚀 회원가입 요청 데이터:", payload);

            await axios.post("http://13.124.71.212:8080/api/users/signup", payload);

            setAlertTitle("회원가입 성공");
            setAlertMessage(`${nickname}님, 환영합니다!`);
            setAlertVisible(true);
            setTimeout(() => {
                navigation.navigate("LoginPage");
            }, 1500);
        } else {
            setAlertTitle("이메일 인증 필요");
            setAlertMessage("이메일 인증이 완료되지 않았습니다.");
            setAlertVisible(true);
        }
    } catch (err: any) {
        console.error("회원가입 실패:", err);

        let message = "회원가입 중 오류가 발생했습니다.";
        if (err.response) {
            message = err.response.data?.message || "서버 응답 오류";
        } else if (err.request) {
            message = "서버로부터 응답이 없습니다.";
        } else {
            message = "요청 설정 중 오류가 발생했습니다.";
        }

        setAlertTitle("실패");
        setAlertMessage(message);
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
                                setUnivName(item.name);
                                fetchAddressAndCoords(item.name);
                                setSchoolSuggestions([]);
                                setShowSuggestions(false);
                            }}
                            style={styles.suggestionItem}
                        >
                            <Text>{item.name}</Text>
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
                onPress={handleSignUp}
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