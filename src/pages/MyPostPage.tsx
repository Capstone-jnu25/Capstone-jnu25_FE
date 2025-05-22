import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { TabProps, NavigationProp } from "../types";
import MenuBar from "../components/MenuBar";
import Icon from "react-native-vector-icons/Ionicons";
import Category from "../components/Category";

const MyPostPage: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation<NavigationProp>();

    return(
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => {navigation.goBack()}}>
                        <Icon name='arrow-back' size={25} style={{ marginTop: 16, marginBottom: 10 }} color="#233b6d" />
                    </TouchableOpacity>
                </View>
                
                <View style={styles.row}>
                    <Text style={styles.textTitle}>내가 쓴 글</Text>
                </View>

                <View style={styles.list}>
                    <TouchableOpacity onPress={() => {navigation.navigate('StudyApplicantList')}}>
                        <View style={styles.row}>
                            <Text style={styles.text}>에어팟 프로</Text>
                            <Category label={'분실물'}/>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    <TouchableOpacity onPress={() => {navigation.navigate('MeetApplicantList')}}>
                        <View style={styles.row}>
                            <Text style={styles.text}>에어팟 프로</Text>
                            <Category label={'번개'}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.menuBarContainer}>
              <MenuBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
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
    menuBarContainer: {
        marginTop:'auto',
        zIndex:1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    row:{
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    list:{
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
        width: '100%',
        backgroundColor: 'white',
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 8,
      },
})

export default MyPostPage;

