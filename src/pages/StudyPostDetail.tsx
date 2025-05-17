import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { TabProps,NavigationProp } from "../types";
import Icon from "react-native-vector-icons/Ionicons";
import StudyPostDetailItem from "../components/StudyPostItemDetail";


const StudyPostDetail: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
     const navigation = useNavigation<NavigationProp>();

    return(
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <TouchableOpacity onPress={() => {navigation.goBack()}}>
                    <Icon name='arrow-back' size={25} style={{ marginTop: 16, marginBottom: 10 }} color="#233b6d"/>
                </TouchableOpacity>
                
                <View style={styles.itemContainer}>
                    <StudyPostDetailItem 
                        title="같이 반수할 사람"
                        dDay="D-DAY"
                        time="수요일마다"
                        location="디도, 카페, 앱 인증"
                        description="원하는 대학이나 뭐 짧은 각오 부탁해요."
                        onSubmit={() => {}}
                    />
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
    itemContainer: {
        flex:1,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding:20,
    },
});

export default StudyPostDetail;

