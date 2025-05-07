import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { TabProps, NavigationProp } from "../types";
import MenuBar from "../components/MenuBar";
import Icon from "react-native-vector-icons/Ionicons";

const MyPage: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation<NavigationProp>();

    return(
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => {navigation.goBack()}}>
                        <Icon name='arrow-back' size={25} style={{ marginTop: 16, marginBottom: 10 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>{}}>
                        <Text style={styles.fixButton}>내 정보 수정</Text>
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
    fixButton: {
        fontSize: 14,
        color: '#007AFF',
    },
})

export default MyPage;

