import React from "react";
import { View, StyleSheet } from "react-native";
import MenuBar from '../components/MenuBar';
import { TabProps } from '../types';

const TradePage: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    
    return (
        <View>
            <View>

            </View>
            <MenuBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </View>
    )
}

export default TradePage;