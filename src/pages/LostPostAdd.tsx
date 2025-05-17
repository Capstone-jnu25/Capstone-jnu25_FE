import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { TabProps, NavigationProp } from "../types";
import Icon from "react-native-vector-icons/Ionicons";
import DropDownPicker from 'react-native-dropdown-picker';
import { Text } from "react-native-gesture-handler";
import CustomButton from "../components/CustomButton";

const LostPostAdd: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation<NavigationProp>();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("분실");
    const [items, setItems] = useState([
        { label: "분실", value: "분실" },
        { label: "습득", value: "습득" }
    ]);

    return(
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => {navigation.goBack()}}>
                        <Icon name='close-outline' size={25} style={{ marginTop: 16, marginBottom: 10 }} color="#233b6d" />
                    </TouchableOpacity>
                </View>

                <TextInput
                    placeholder="물품 이름" 
                    placeholderTextColor={'#777'} 
                    style = {styles.input} />
                <TextInput
                    placeholder="물품과 관련된 정보를 입력하세요"
                    placeholderTextColor={'#777'} 
                    multiline 
                    style = {styles.textArea} />
                <TouchableOpacity style={styles.location} onPress={()=>{}}>
                    <Text style={styles.uploadText}>분실/습득한 장소를 선택하세요</Text>
                </TouchableOpacity>
                <TextInput
                    placeholder="상세 위치를 작성하세요"
                    placeholderTextColor={'#777'} 
                    style = {styles.inputLocation} />
                <TouchableOpacity style={styles.upload} onPress={()=>{}}>
                    <View style={styles.row}>
                        <Icon name='add-outline' size={15} color="#777"/>
                        <Text style={styles.uploadText}> 물품 사진을 업로드하세요 </Text>
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
                />

                <CustomButton title='완료' style={styles.button} onPress={() => {}}/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor : '#C6E4FF',
    },
    contentContainer: {
        flex:1,
        padding:20,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
     },
     input : {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
     },
     inputLocation:{
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
    location: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
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
    dropdownContainer: {
        width: '40%',
        marginBottom: 15,
        alignSelf: 'flex-end',
    },
    dropdown: {
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 0,
        paddingHorizontal: 20,
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
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: '30%',
        backgroundColor: '#233b6d',
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderWidth: 0,
    }
})

export default LostPostAdd;