import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Text,
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TabProps, NavigationProp } from "../types";
import Icon from "react-native-vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";
import CustomButton from "../components/CustomButton";
import CustomAlert from "../components/CustomAlert";
import ModalWithMap from "../components/ModalWithMap";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "react-native-image-picker";

const LostPostAdd: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
  const navigation = useNavigation<NavigationProp>();

  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [place, setPlace] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [selectedCoords, setSelectedCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [camera, setCamera] = useState<{ latitude: number; longitude: number } | null>(null);

  const [alertTitle, setAlertTitle] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("분실");
  const [items, setItems] = useState([
    { label: "분실", value: "분실" },
    { label: "습득", value: "습득" }
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchCameraPosition = async () => {
      const lat = await AsyncStorage.getItem("latitude");
      const lng = await AsyncStorage.getItem("longitude");
      if (lat && lng) {
        setCamera({ latitude: parseFloat(lat), longitude: parseFloat(lng) });
      }
    };
    fetchCameraPosition();
  }, []);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: "photo",
      quality: 0.8
    });

    if (result.assets && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri || null);
    }
  };

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`, {
        headers: { Authorization: `KakaoAK f958d2a57846011e2462194fb63cd48c` }, 
      });

      const address = response.data.documents?.[0]?.address?.address_name;
      return address || '';
    } catch {
      return '';
    }
  };

  const handleSubmit = async () => {
  if (!title.trim()) {
    setAlertTitle("확인");
    setAlertMessage("제목을 입력해주세요.");
    setAlertVisible(true);
    return;
  }

  if (!selectedCoords) {
    setAlertTitle("확인");
    setAlertMessage("위치를 선택해주세요.");
    setAlertVisible(true);
    return;
  }

  try {
    const token = await AsyncStorage.getItem("token");
    const isLost = value === "분실";

    let resolvedAddress = '';
    if (selectedCoords) {
      resolvedAddress = await reverseGeocode(selectedCoords.latitude, selectedCoords.longitude);
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("contents", contents);
    formData.append("place", resolvedAddress + " " + place);
    formData.append("lost", isLost.toString());
    formData.append("lostLatitude", selectedCoords.latitude.toString());
    formData.append("lostLongitude", selectedCoords.longitude.toString());

    if (photoUri) {
      const fileName = photoUri.split("/").pop() || "photo.jpg";
      const fileType = fileName.split(".").pop();

      formData.append("image", {
        uri: photoUri,
        type: `image/${fileType}`,
        name: fileName,
      } as any);
    }

    const response = await axios.post(
      "http://13.124.71.212:8080/api/lostboards",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("✅ 작성 성공", response.data);
    navigation.navigate('LostPostList');
  } catch (error) {
    console.error("❌ 작성 실패", error);
    setAlertTitle("오류");
    setAlertMessage("글 작성 중 오류가 발생했습니다.");
    setAlertVisible(true);
  }
};


  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled">
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="close-outline" size={25} color="#233b6d" />
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder="물품 이름"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            placeholder="물품과 관련된 정보를 입력하세요"
            multiline
            style={styles.textArea}
            value={contents}
            onChangeText={setContents}
          />
          <TouchableOpacity
            style={[
              styles.location,
              selectedCoords && { borderColor: 'black', borderWidth: 2 }
            ]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.uploadText}>분실/습득한 장소를 선택하세요</Text>
          </TouchableOpacity>
          {camera && (
            <ModalWithMap
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
              onConfirm={(coords) => {
                setSelectedCoords(coords);
                setModalVisible(false);
              }}
              initialCoords={camera}
            />
          )}
          <TextInput
            placeholder="상세 위치를 작성하세요"
            style={styles.inputLocation}
            value={place}
            onChangeText={setPlace}
          />
          <TouchableOpacity 
            style={[styles.upload, 
            photoUri && {borderColor:'black', borderWidth: 2}
            ]} 
            onPress={handleImagePick}
            >
            <View style={styles.row}>
              <Icon name="add-outline" size={15} color="#777" />
              <Text style={styles.uploadText}>물품 사진을 올려주세요</Text>
            </View>
          </TouchableOpacity>

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
            listMode="SCROLLVIEW"
          />

          <CustomButton title="완료" style={styles.button} onPress={handleSubmit} />
        </View>
      </View>
       <CustomAlert
          visible={alertVisible}
          title={alertTitle}
          message={alertMessage}
          onClose={() => setAlertVisible(false)}
          onConfirm={() => setAlertVisible(false)} 
      />
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
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    height: 200,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  inputLocation: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  location: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  upload: {
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    padding: 30,
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: '#bbb',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    color: '#777',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownContainer: {
    width: '40%',
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  dropdownList: {
    backgroundColor: 'white',
    borderRadius: 20,
  },
  button: {
    backgroundColor: '#233b6d',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    alignSelf: 'flex-end',   
    width: 120,
  },
});

export default LostPostAdd;
