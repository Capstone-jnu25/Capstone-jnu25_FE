import React from "react";
import { View, StyleSheet } from "react-native";
import MenuBar from '../components/MenuBar';
<<<<<<< HEAD

type TradePageProps = {
    currentTab: string;
    setCurrentTab: (tab: string) => void;
  };

const TradePage: React.FC<TradePageProps> = ({ currentTab, setCurrentTab }) => {
=======
import { TabProps } from '../types';

const TradePage: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
>>>>>>> e116bcd (feat: MeunBar 화면 전환)
    
    return (
        <View>
            <View>

            </View>
<<<<<<< HEAD
            <MenuBar currentTab={currentTab} onTabPress={setCurrentTab} />
=======
            <MenuBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
>>>>>>> e116bcd (feat: MeunBar 화면 전환)
        </View>
    )
}

export default TradePage;