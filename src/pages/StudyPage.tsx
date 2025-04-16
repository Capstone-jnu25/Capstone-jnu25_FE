import React from "react";
import { View, StyleSheet } from "react-native";
import MenuBar from '../components/MenuBar';

type StudyPageProps = {
    currentTab: string;
    setCurrentTab: (tab: string) => void;
  };

const StudyPage: React.FC<StudyPageProps> = ({ currentTab, setCurrentTab }) => {
    
    return (
        <View>
            <MenuBar currentTab={currentTab} onTabPress={setCurrentTab} />
        </View>
    )
}

export default StudyPage;