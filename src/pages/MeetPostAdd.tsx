import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, TextInput, Text} from 'react-native';
import { TabProps, NavigationProp } from "../types";
import Icon from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/CustomButton";
import CustomCheckbox from "../components/CustomCheckBox";

const MeetPostAdd: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation<NavigationProp>();
    const [isSelected, setIsSelected] = useState(false);
    const [selectedGender, setSelectedGender] = useState<string | null>(null);
    

    return(
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
                    style = {styles.input} />
                <View style={styles.content}>
                    <CustomCheckbox 
                        label="선착순으로 받기" 
                        checked={isSelected} 
                        onChange={setIsSelected} 
                    />
                    <View style={styles.row}>
                        <Text style= {styles.text}>마감일:</Text>
                        <TextInput
                            style={styles.textinput}/>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.row}>
                        <Text style= {styles.text}>시간:</Text>
                        <TextInput
                            style={styles.textinput}/>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.row}>
                        <Text style= {styles.text}>장소:</Text>
                        <TextInput
                            style={styles.textinput}/>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.row}>
                        <Text style= {styles.text}>성별: </Text>
                        <CustomButton
                            title="남성"
                            onPress={() => setSelectedGender("남성")}
                            style={[
                            styles.buttonSex,
                            ...(selectedGender === "남성" ? [{ backgroundColor: "#fff5c4"  }] : []),
                            ]}
                            textStyle={{ color: "black" }}
                        />

                        <CustomButton
                            title="여성"
                            onPress={() => setSelectedGender("여성")}
                            style={[
                            styles.buttonSex,
                            ...(selectedGender === "여성" ? [{ backgroundColor: "#fff5c4" }] : []),
                            ]}
                            textStyle={{ color: "black" }}
                        />

                        <CustomButton
                            title="무관"
                            onPress={() => setSelectedGender("무관")}
                            style={[
                            styles.buttonSex,
                            ...(selectedGender === "무관" ? [{ backgroundColor: "#fff5c4" }] : []),
                            ]}
                            textStyle={{ color: "black" }}
                        />
                    </View>
                    <View style={styles.separator} />
                        <Text style= {styles.text}>기타</Text>
                        <TextInput multiline style={styles.textArea}/> 
                </View>
                <TextInput
                    placeholder="인원수"
                    placeholderTextColor={'#777'} 
                    style={styles.inputNum}
                    keyboardType="numeric"
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
    row: {
        flexDirection: 'row',
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
    inputNum : {
        width: '20%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
        alignContent:'center'
    },
    textinput:{
        marginTop:5,
        width:'80%',
        height:40,
    },
    textArea:{
        marginTop:5,
        width:'100%',
        height:'50%',
    },
    text:{
        width:50,
        fontSize:16,
        margin:5,
    },
    content:{
        width: '100%',
        height: '70%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
    },
    button: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: '30%',
        backgroundColor: '#233b6d',
    },
    buttonSex: {
        width:'25%',
        marginBottom:0,
        marginRight:5,
        backgroundColor:'#ededed',
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 8,
      },
})

export default MeetPostAdd;