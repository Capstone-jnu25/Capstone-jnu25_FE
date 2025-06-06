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
import { NavigationProp } from "../types";
import Icon from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/CustomButton";
import CustomAlert from "../components/CustomAlert";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "react-native-image-picker";

const TradePostAdd = () => {
    const navigation = useNavigation<NavigationProp>();
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [place, setPlace] = useState('');
    const [price, setPrice] = useState('');
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    
    const [alertTitle, setAlertTitle] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleImagePick = async () => {
        const result = await ImagePicker.launchImageLibrary({
        mediaType: "photo",
        quality: 0.8
        });

        if (result.assets && result.assets.length > 0) {
        setPhotoUri(result.assets[0].uri || null);
        }
    };

    const handleSubmit = async () => {
        if (!title.trim()) {
        setAlertTitle("확인");
        setAlertMessage("제목을 입력해주세요.");
        setAlertVisible(true);
        return;
        }

        if (!price) {
        setAlertTitle("확인");
        setAlertMessage("가격을 입력력해주세요.");
        setAlertVisible(true);
        return;
        }

        try {
        const token = await AsyncStorage.getItem("token");

        const payload = {
            title,
            contents,
            place,
            photo: photoUri,
            price,
        };

        const response = await axios.post("http://13.124.71.212:8080/api/secondhand", payload, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log("✅ 작성 성공", response.data);
        navigation.navigate('TradePage');
        } catch (error) {
        console.error("❌ 작성 실패", error);
        }
    };

    return(
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
             <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled">
            <View style={styles.mainContainer}>
                <View style={styles.contentContainer}>
                    <View style={styles.headerRow}>
                        <TouchableOpacity onPress={() => {navigation.goBack()}}>
                            <Icon name='close-outline' size={25} style={{ marginTop: 16, marginBottom: 10 }} color="#233b6d"/>
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
                    <TextInput 
                        placeholder="거래 장소를 입력하세요"
                        style = {styles.inputCenter}
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
            

                    <TextInput 
                        placeholder="가격을 입력하세요"
                        style = {styles.inputCenter}
                        value={price}
                        onChangeText={setPrice}
                    />
                    
                    <CustomButton title='완료' style={styles.button} onPress={handleSubmit} />
                </View>
            </View>
            <CustomAlert
            visible={alertVisible}
            title={alertTitle}
            message={alertMessage}
            onClose={() => setAlertVisible(false)}
            />
            </ScrollView>
            </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor : '#C6E4FF',
    },
    contentContainer: {
        padding:20,
    },
    headerRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
     input : {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
     },
     inputCenter:{
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
        textAlign: 'center', 
     },
     textArea: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        paddingTop: 20,
        marginBottom: 15,
        height: 300,
        fontSize: 16,
        textAlignVertical: 'top',
    },
    uploadText: {
        color: '#777',
        fontSize: 16,
    },
    upload: {
        width: '100%',
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
    row:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#233b6d',
        borderRadius: 20,
        paddingVertical: 12,
        alignItems: 'center',
        alignSelf: 'flex-end',   
        width: 120,
    },
})

export default TradePostAdd;