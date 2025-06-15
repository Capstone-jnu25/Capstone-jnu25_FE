import React, { useEffect, useState } from "react";
import { useNavigation, CommonActions } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TabProps, NavigationProp } from "../types";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import CustomAlert from "../components/CustomAlert";
import CustomButton from "../components/CustomButton";
import CustomTextInput from "../components/CustomTextInput";
import ProfileText from "../components/ProfileText";

const MyPage: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
  const navigation = useNavigation<NavigationProp>();
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [studentNum, setStudentNum] = useState('');
  const [department, setDepartment] = useState('');
  const [tempDepartment, setTempDepartment] = useState(''); // ✅ 임시 입력용
  const isDepartmentSet = department !== ''; // 실제 저장된 학과 여부

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false); // 일반 알림
const [confirmVisible, setConfirmVisible] = useState(false); // 탈퇴 확인

  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (title: string, message: string) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  useEffect(() => {
    const fetchMyInfo = async () => {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token");
      if (!userId || !token) return;

      try {
        const res = await axios.get(`http://13.124.71.212:8080/api/users/${userId}/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const { nickname, email, studentNum, department } = res.data;
        setNickname(nickname);
        setEmail(email);
        setStudentNum(studentNum.toString());
        setDepartment(department || "");
      } catch (err) {
        console.error("내 정보 조회 실패", err);
      }
    };

    fetchMyInfo();
  }, []);

  const handlePasswordCheck = () => {
    if (newPassword === confirmPassword && newPassword.trim() !== '') {
      setPasswordsMatch(true);
      showAlert("확인 완료", "비밀번호가 일치합니다.");
    } else {
      setPasswordsMatch(false);
      showAlert("오류", "비밀번호가 일치하지 않습니다.");
    }
  };

  const handleSubmit = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const token = await AsyncStorage.getItem("token");
    if (!userId || !token) return;

    // 학과 입력 처리
    if (!isDepartmentSet && tempDepartment.trim()) {
        try {
        await axios.put(`http://13.124.71.212:8080/api/users/${userId}`, {
            department: tempDepartment
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setDepartment(tempDepartment);
        console.log("학과 등록 완료");
        showAlert("완료", "학과 등록이 완료되었습니다.");
        navigation.goBack();
        } catch (err) {
        console.error("학과 등록 실패", err);
        showAlert("실패", "학과 등록에 실패했습니다.");
        return;
        }
    }

    if (newPassword || confirmPassword) {
        if (newPassword !== confirmPassword) {
        showAlert("오류", "비밀번호가 일치하지 않습니다.");
        return;
        }
        try {
        await axios.put(`http://13.124.71.212:8080/api/users/${userId}/password`, {
            newPassword
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("비밀번호 변경 완료");
        showAlert("완료", "비밀번호 변경이 완료되었습니다.");
        navigation.goBack();
        } catch (err) {
        console.error("비밀번호 변경 실패", err);
        showAlert("실패", "비밀번호 변경에 실패했습니다.");
        return;
        }
    }
    showAlert("성공", "정보가 성공적으로 수정되었습니다.");
    };

    const handleDeleteAccount = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const userId = await AsyncStorage.getItem("userId");

    if (!token || !userId) throw new Error("로그인 정보 없음");

    await axios.delete(`http://13.124.71.212:8080/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // 로그아웃 후 메인으로 이동
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userId");
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'MainPage' }],
      })
    );
  } catch (error) {
    console.error("❌ 탈퇴 실패:", error);
  }
};


  return (
    <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.mainContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.headerRow}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name='arrow-back' size={25} style={{ marginTop: 16, marginBottom: 10 }} color="#233b6d" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() =>setConfirmVisible(true)}>
                <Text style={styles.deleteButton}>탈퇴하기</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.horizontal}>
              <Image
                source={require('../assets/profile.png')}
                style={styles.profileImage}
              />

              <ProfileText>{nickname}</ProfileText>
              <ProfileText>{email}</ProfileText>
              <ProfileText>{studentNum}</ProfileText>
              {isDepartmentSet ? (
                <ProfileText>{department}</ProfileText>
                ) : (
                <CustomTextInput
                    placeholder="학과(선택)"
                    value={tempDepartment}
                    onChangeText={setTempDepartment} 
                />
                )}

              {!showPasswordFields ? (
                <CustomButton
                  title="비밀번호 변경"
                  onPress={() => setShowPasswordFields(true)}
                />
              ) : (
                <>
                  <CustomTextInput
                    placeholder="새 비밀번호"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                  />
                  <View style={styles.checkPassWord}>
                    <CustomTextInput
                      style={{ width: 140 }}
                      placeholder="비밀번호 확인"
                      secureTextEntry
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity style={styles.checkButton} onPress={handlePasswordCheck}>
                      <Text style={styles.check}>확인</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>

            <CustomButton title="완료" style={styles.button} onPress={handleSubmit} />
            <CustomAlert
                visible={alertVisible}
                title={alertTitle}
                message={alertMessage}
                onClose={() => setAlertVisible(false)}
                onConfirm={() => setAlertVisible(false)}
                />
               <CustomAlert
                visible={confirmVisible}
                title="탈퇴"
                message="정말 탈퇴하시겠습니까?"
                onClose={() => setConfirmVisible(false)} //취소 하는 버튼 만들어야함
                onConfirm={handleDeleteAccount} 
              />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#C6E4FF',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButton: {
    fontSize: 14,
    color: '#FF5659',
  },
  horizontal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderWidth: 4,
    borderColor: '#95CEFF',
    borderRadius: 200,
    backgroundColor: '#fff',
    margin: 30,
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
  check: {
    color: '#FF5659',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#233b6d',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: 120,
    marginTop: 20,
    marginBottom: 40,
  },
});

export default MyPage;
