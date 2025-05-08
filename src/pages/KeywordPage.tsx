import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { TabProps, NavigationProp } from "../types";
import Icon from "react-native-vector-icons/Ionicons";
import Category from "../components/Category";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import CustomText from "../components/CustomText";
import DropDownPicker from 'react-native-dropdown-picker';

const KeywordPage: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation<NavigationProp>();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("분실물");
    const [items, setItems] = useState([
        { label: "분실물", value: "분실물" },
        { label: "중고", value: "중고" },
        { label: "번개", value: "번개" }
    ]);
    return(
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => {navigation.goBack()}}>
                        <Icon name='arrow-back' size={25} style={{ marginTop: 16, marginBottom: 10 }} />
                    </TouchableOpacity>
                    <Text>키워드 설정</Text>
                    <Text/>
                </View>

                <View style={styles.row}>
                    <CustomTextInput
                        placeholder="키워드 입력"
                        style={styles.input}
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
                    <CustomButton title='추가' style={styles.button} onPress={() => {}}/>
                </View>

                <View>
                    <Category label='분실물'/>
                    <View style={styles.row}>
                        <CustomText>버즈</CustomText>
                        <TouchableOpacity style={styles.deleteButton}>
                            <Text style={styles.delete}>삭제</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <CustomText>나이키</CustomText>
                        <TouchableOpacity style={styles.deleteButton}>
                            <Text style={styles.delete}>삭제</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.separator}/>
                <View>
                    <Category label='중고'/>
                    <View style={styles.row}>
                        <CustomText>나이키</CustomText>
                        <TouchableOpacity style={styles.deleteButton}>
                            <Text style={styles.delete}>삭제</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.separator}/>
                <View>
                    <Category label='번개'/>
                    <View style={styles.row}>
                        <CustomText>영화</CustomText>
                        <TouchableOpacity style={styles.deleteButton}>
                            <Text style={styles.delete}>삭제</Text>
                        </TouchableOpacity>
                    </View>
                </View>

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
        marginBottom: 20,
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        marginRight: 10,
        marginBottom: 15,
        height:50,
    },
    text:{
        flex:1,
        fontSize:12,
        color:'#233b6d',
        marginLeft:20,
        paddingBottom:20,
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 15,
      },
    dropdownContainer: {
        width: '30%',
        marginBottom: 15,
        alignSelf: 'flex-end',
        height:50,
    },
    dropdown: {
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 0,
        paddingHorizontal: 20,
        height:50,
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
        color: '#FF5659', // 텍스트 색상을 흰색으로 설정
        fontSize: 14, // 텍스트 크기 설정
    }
})

export default KeywordPage;

