import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Text,
    Platform,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import { TabProps, NavigationProp } from "../types";
import Icon from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/CustomButton";
import CustomCheckbox from "../components/CustomCheckBox";
import axiosInstance from '../api/axiosInstance';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from 'react-native-date-picker'

const MeetPostAdd: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation<NavigationProp>();
    const [isSelected, setIsSelected] = useState(false);
    const [selectedGender, setSelectedGender] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [place, setPlace] = useState('');
    const [time, setTime] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [contents, setContents] = useState('');
    const [maxParticipants, setMaxParticipants] = useState('');

    const handleSubmit = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const payload = {
                title,
                time,
                place,
                contents,
                dueDate: new Date(dueDate.getTime() + 9 * 60 * 60 * 1000).toISOString().split('T')[0],
                gender: selectedGender === "무관" ? "ANY" : selectedGender === "남성" ? "M" : "F",
                maxParticipants: parseInt(maxParticipants),
                automatic: isSelected,
                boardType: "MEETUP",
            };
            console.log("보내는 payload:", payload);
            const response = await axiosInstance.post("http://13.124.71.212:8080/api/gathering", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            console.log("✅ 작성 성공:", response.data);
            navigation.goBack();
        } catch (error) {
            console.error("❌ 작성 실패:", error);
        }
    };
    const formattedDate = `${dueDate.getFullYear()}-${('0' + (dueDate.getMonth() + 1)).slice(-2)}-${('0' + dueDate.getDate()).slice(-2)}`;

    return(
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <View style={styles.mainContainer}>
                    <View style={styles.contentContainer}>
                        <View style={styles.headerRow}>
                            <TouchableOpacity onPress={() => {navigation.goBack()}}>
                                <Icon name='close-outline' size={25} style={{ marginTop: 16, marginBottom: 10 }} color="#233b6d"/>
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            placeholder="제목" 
                            placeholderTextColor={'#777'} 
                            style = {styles.input} value={title} onChangeText={setTitle}/>
                        <View style={styles.content}>
                            <CustomCheckbox 
                                label="선착순으로 받기" 
                                checked={isSelected} 
                                onChange={setIsSelected} 
                            />
                            <View style={styles.row}>
                                <Text style= {styles.text}>마감일:</Text>
                                <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateBox}>
                                    <Text style={styles.dateText}>{formattedDate}</Text>
                                </TouchableOpacity>
                            </View>
                            <DatePicker
                                modal
                                open={showPicker}
                                date={dueDate}
                                mode="date"
                                locale="ko"
                                onConfirm={(date) => {
                                    setShowPicker(false);
                                    setDueDate(date);
                                }}
                                onCancel={() => setShowPicker(false)}
                                theme="light"
                            />
                            <View style={styles.separator} />
                            <View style={styles.row}>
                                <Text style= {styles.text}>시간:</Text>
                                <TextInput
                                    style={styles.textinput} value={time} onChangeText={setTime} />
                            </View>
                            <View style={styles.separator} />
                            <View style={styles.row}>
                                <Text style= {styles.text}>장소:</Text>
                                <TextInput
                                    style={styles.textinput}  value={place} onChangeText={setPlace} />
                            </View>
                            <View style={styles.separator} />
                            <View style={styles.row}>
                                <Text style= {styles.text}>성별: </Text>
                                    {["남성", "여성", "무관"].map(gender => (
                                        <CustomButton
                                            key={gender}
                                            title={gender}
                                            onPress={() => setSelectedGender(gender)}
                                        style={[
                                            styles.buttonSex,
                                            ...(selectedGender === gender ? [styles.selectedGenderButton] : [])
                                            ]}
                                            textStyle={{ color: "black" }}
                                        />
                                    ))}
                            </View>
                            <View style={styles.separator} />
                                <Text style= {styles.text}>기타</Text>
                                <TextInput multiline style={styles.textArea} value={contents} onChangeText={setContents} /> 
                        </View>
                        <TextInput
                            placeholder="인원수"
                            placeholderTextColor={'#777'} 
                            style={styles.inputNum}
                            keyboardType="numeric"
                            value={maxParticipants}
                            onChangeText={setMaxParticipants}
                        />
                        <CustomButton title='완료' style={styles.button} onPress={handleSubmit}/>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

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
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    input: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    inputNum: {
        width: '25%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        fontSize: 16,
        textAlign: 'center',
    },
    textinput: {
        flex: 1,
        height: 40,
    },
    textArea: {
        marginTop: 5,
        width: '100%',
        height: 100,
        textAlignVertical: 'top',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
    },
    text: {
        width: 55,
        fontSize: 16,
        margin: 5,
    },
    content: {
        width: '100%',
         height: 500,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
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
    buttonSex: {
        width: '25%',
        marginRight: 5,
        marginTop: 5,
        backgroundColor: '#ededed',
    },
    selectedGenderButton: {
        backgroundColor: '#fff5c4',
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 8,
    },
    dateBox: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    dateText: {
        fontSize: 16,
        color: '#333',
    },
});

export default MeetPostAdd;