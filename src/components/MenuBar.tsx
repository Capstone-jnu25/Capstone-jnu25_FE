import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

type BottomTabProps = {
  currentTab: string;
  onTabPress: (tab: string) => void;
};

const BottomTab: React.FC<BottomTabProps> = ({ currentTab, onTabPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, currentTab === 'Lost' && styles.activeTab]}
        onPress={() => onTabPress('Lost')}>
        <Text style={styles.tabText}>분실/습득</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, currentTab === 'Trade' && styles.activeTab]}
        onPress={() => onTabPress('Trade')}>
        <Text style={styles.tabText}>중고거래</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, currentTab === 'Study' && styles.activeTab]}
        onPress={() => onTabPress('Study')}>
        <Text style={styles.tabText}>스터디</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, currentTab === 'Meet' && styles.activeTab]}
        onPress={() => onTabPress('Meet')}>
        <Text style={styles.tabText}>번개</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tab: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#007BFF',
  },
  tabText: {
    fontSize: 14,
    color: '#333',
  },
});

export default BottomTab;
