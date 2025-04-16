import React from "react";
import { View, StyleSheet } from "react-native";
import MenuBar from '../components/MenuBar';

type MeetPageProps = {
    currentTab: string;
    setCurrentTab: (tab: string) => void;
  };

const MeetPage: React.FC<MeetPageProps> = ({ currentTab, setCurrentTab }) => {
    
    return (
        <View>
            <MenuBar currentTab={currentTab} onTabPress={setCurrentTab} />
        </View>
    )
}

export default MeetPage;