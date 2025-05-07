import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { TabProps } from '../types';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import SubMenu from './SubMenu';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const MenuBar: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
  const navigation = useNavigation<NavigationProp>();
  const [subMenuVisible, setSubMenuVisible] = useState(false);
  const routes = useNavigationState((state) => state.routes);
  const currentRoute = routes[routes.length - 1].name as keyof RootStackParamList;

  useEffect(() => {
    setCurrentTab(currentRoute === 'MyPage' || currentRoute === 'NotificationPage' ? 'SubPage' : currentRoute);
  }, [currentRoute]);

  const handleTabPress = (tab: keyof RootStackParamList) => {
    setCurrentTab(tab);
    setSubMenuVisible(false);
    navigation.navigate(tab);
  };

  const handleNavigate = (screen: keyof RootStackParamList) => {
    setCurrentTab('SubPage');
    setSubMenuVisible(false);
    navigation.navigate(screen);
  };

  const handleCloseMenu = () => {
    setSubMenuVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, currentTab === 'LostPage' && styles.activeTab]}
        onPress={() => handleTabPress('LostPage')}
      >
        <Icon1 name="home" size={40} color="#2D4183" />
        <Text style={styles.tabText}>분실/습득</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, currentTab === 'TradePage' && styles.activeTab]}
        onPress={() => handleTabPress('TradePage')}
      >
        <Icon2 name="basket-shopping" size={40} color="#2D4183" />
        <Text style={styles.tabText}>중고거래</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, currentTab === 'StudyPage' && styles.activeTab]}
        onPress={() => handleTabPress('StudyPage')}
      >
        <Icon1 name="book" size={40} color="#2D4183" />
        <Text style={styles.tabText}>스터디</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, currentTab === 'MeetPage' && styles.activeTab]}
        onPress={() => handleTabPress('MeetPage')}
      >
        <Icon1 name="flash" size={40} color="#2D4183" />
        <Text style={styles.tabText}>번개</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, currentTab === 'SubPage' && styles.activeTab]}
        onPress={() => setSubMenuVisible(!subMenuVisible)}
      >
        <Icon1 name="menu" size={40} color="#2D4183" />
        <Text style={styles.tabText}>마이</Text>
      </TouchableOpacity>

      {subMenuVisible && (
        <SubMenu
          onClose={handleCloseMenu}
          onNavigate={handleNavigate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
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
    borderBottomColor: '#2D4183',
  },
  tabText: {
    fontSize: 14,
    color: '#333',
  },
});

export default MenuBar;
