import React from "react";
import { View, StyleSheet } from "react-native";
import MenuBar from '../components/MenuBar';
import { TabProps } from '../types';

const MeetPage: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    
    return (
        <View>
            <MenuBar currentTab={currentTab} setCurrentTab={setCurrentTab} />

        </View>
    )
}

export default MeetPage;