import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { TabProps, NavigationProp } from "../types";
import Icon from "react-native-vector-icons/Ionicons";
import Category from "../components/Category";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import CustomText from "../components/CustomText";
import DropDownPicker from 'react-native-dropdown-picker';
import axiosInstance from '../api/axiosInstance';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAlert from "../components/CustomAlert"; // ✅ 알림 컴포넌트 import

type Keyword = {
  id: number;
  userId: number;
  keywordText: string;
  boardType: "LOST" | "SECONDHAND" | "MEETUP";
};

const KeywordPage: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
  const navigation = useNavigation<NavigationProp>();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("분실물");
  const [items, setItems] = useState([
    { label: "분실물", value: "분실물" },
    { label: "중고", value: "중고" },
    { label: "번개", value: "번개" }
  ]);

  const [keyword, setKeyword] = useState('');
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [token, setToken] = useState<string | null>(null);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (title: string, message: string) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const boardTypeMap: { [key: string]: string } = {
    "분실물": "LOST",
    "중고": "SECONDHAND",
    "번개": "MEETUP"
  };

  const boardLabelMap: { [key: string]: string } = {
    "LOST": "분실물",
    "SECONDHAND": "중고",
    "MEETUP": "번개"
  };

  const fetchKeywords = async (tokenFromState: string | null) => {
    if (!tokenFromState) {
      showAlert("인증 오류", "로그인이 필요합니다.");
      return;
    }

    try {
      const response = await axiosInstance.get("http://13.124.71.212:8080/api/keywords", {
        headers: { Authorization: `Bearer ${tokenFromState}` }
      });
      setKeywords(response.data);
    } catch (error) {
      console.error("❌ 키워드 조회 오류:", error);
      showAlert("에러", "키워드를 불러오지 못했습니다.");
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("token").then(t => {
      setToken(t);
      fetchKeywords(t);
    });
  }, []);

  const handleAddKeyword = async () => {
    if (!keyword.trim()) {
      showAlert("입력 오류", "키워드를 입력해주세요.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      await axiosInstance.post(
        "http://13.124.71.212:8080/api/keywords",
        {
          keywordText: keyword,
          boardType: boardTypeMap[value]
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setKeyword('');
      fetchKeywords(token);
      showAlert("성공", "키워드가 추가되었습니다.");
      
    } catch (error) {
      console.error(error);
      showAlert("에러", "키워드 추가에 실패했습니다.");
    }
    
  };

  const handleDelete = async (id: number) => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axiosInstance.delete(`http://13.124.71.212:8080/api/keywords/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchKeywords(token);
      showAlert("삭제 완료", "키워드가 삭제되었습니다.");
    } catch (error) {
      console.error(error);
      showAlert("에러", "삭제에 실패했습니다.");
    }
  };

  const renderKeywordSection = (type: "LOST" | "SECONDHAND" | "MEETUP") => {
    const filtered = keywords.filter(k => k.boardType === type);
    if (filtered.length === 0) return null;

    return (
      <View key={type}>
        <Category label={boardLabelMap[type]} />
        {filtered.map(k => (
          <View key={k.id} style={styles.row}>
            <CustomText>{k.keywordText}</CustomText>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(k.id)}>
              <Text style={styles.delete}>삭제</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.separator} />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <Icon name='arrow-back' size={25} style={{ marginTop: 16, marginBottom: 10 }} color="#233b6d" />
          </TouchableOpacity>
          <Text style={styles.textTitle}>키워드 설정</Text>
          <Text />
        </View>

        <View style={styles.row}>
          <CustomTextInput
            placeholder="키워드 입력"
            style={styles.input}
            value={keyword}
            onChangeText={setKeyword}
          />
          <DropDownPicker
            open={open}
            setOpen={setOpen}
            value={value}
            setValue={setValue}
            items={items}
            setItems={setItems}
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            dropDownContainerStyle={styles.dropdownList}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.text}>키워드를 설정하면 해당 키워드가 포함된{'\n'}게시글이 게시될 경우 알림을 보냅니다.</Text>
          <CustomButton title='추가' style={styles.button} onPress={handleAddKeyword} />
        </View>

        {renderKeywordSection("LOST")}
        {renderKeywordSection("SECONDHAND")}
        {renderKeywordSection("MEETUP")}

        <CustomAlert
          visible={alertVisible}
          title={alertTitle}
          message={alertMessage}
          onClose={() => setAlertVisible(false)}
          onConfirm={() => setAlertVisible(false)}
        />
      </View>
    </View>
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
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    marginBottom: 15,
    height: 50,
  },
  textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
  text: {
    flex: 1,
    fontSize: 12,
    color: '#233b6d',
    marginLeft: 20,
    paddingBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 15,
  },
  dropdownContainer: {
    width: '32%',
    marginBottom: 15,
    alignSelf: 'flex-end',
    height: 50,
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 0,
    paddingHorizontal: 20,
    height: 50,
  },
  dropdownList: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
    borderColor: 'transparent',
    marginTop: -5,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  button: {
    width: '30%',
    backgroundColor: '#233b6d',
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  deleteButton: {
    backgroundColor: '#fff',
    height: 45,
    borderColor: '#FF5659',
    borderWidth: 3,
    width: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  delete: {
    color: '#FF5659',
    fontSize: 14,
  }
});

export default KeywordPage;
