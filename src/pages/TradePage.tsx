import React from "react";
import { View, StyleSheet } from "react-native";
import MenuBar from '../components/MenuBar';

type TradePageProps = {
    currentTab: string;
    setCurrentTab: (tab: string) => void;
  };

const TradePage: React.FC<TradePageProps> = ({ currentTab, setCurrentTab }) => {
    
    return (
        <View>
            <View>

            </View>
            <MenuBar currentTab={currentTab} onTabPress={setCurrentTab} />
        </View>
    )
}

export default TradePage;