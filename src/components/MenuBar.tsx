import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';
<<<<<<< HEAD
import  Icon  from 'react-native-vector-icons/Ionicons';
import Icon_T from 'react-native-vector-icons/FontAwesome6'

type MenuBarProps = {
  currentTab: string;
  onTabPress: (tab: string) => void;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const MenuBar: React.FC<MenuBarProps> = ({ currentTab, onTabPress }) => {
  const navigation = useNavigation<NavigationProp>();

  const handleTabPress = (tab: keyof RootStackParamList) => {
    onTabPress(tab); // 탭 상태 변경
    navigation.navigate(tab); // 화면 전환
  };
=======
import { TabProps } from '../types';
import Icon1  from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome6'
import SubMenu from './SubMenu';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const MenuBar: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
  const navigation = useNavigation<NavigationProp>();
  const [subMenuVisible, setSubMenuVisible] = useState(false);

  const handleTabPress = (tab: keyof RootStackParamList) => {
    setCurrentTab(tab); // 탭 상태 변경
    navigation.navigate(tab); // 화면 전환
  };
  const handleNavigate = (screen: string) => {
    setSubMenuVisible(false); // 메뉴가 닫히도록 설정
    navigation.navigate(screen as keyof RootStackParamList); // 화면 전환
  };

  const handleCloseMenu = () => {
    setSubMenuVisible(false); // 메뉴 닫기
  };
>>>>>>> e116bcd (feat: MeunBar 화면 전환)
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, currentTab === 'LostPage' && styles.activeTab]}
        onPress={() => handleTabPress('LostPage')}>
<<<<<<< HEAD
         <Icon name="home" size={40} color= "#2D4183" />
=======
         <Icon1 name="home" size={40} color= "#2D4183" />
>>>>>>> e116bcd (feat: MeunBar 화면 전환)
        <Text style={styles.tabText}>분실/습득</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, currentTab === 'TradePage' && styles.activeTab]}
        onPress={() => handleTabPress('TradePage')}>
<<<<<<< HEAD
        <Icon_T name="basket-shopping" size={40} color= "#2D4183" />
=======
        <Icon2 name="basket-shopping" size={40} color= "#2D4183" />
>>>>>>> e116bcd (feat: MeunBar 화면 전환)
        <Text style={styles.tabText}>중고거래</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, currentTab === 'StudyPage' && styles.activeTab]}
        onPress={() => handleTabPress('StudyPage')}>
<<<<<<< HEAD
        <Icon name="book" size={40} color= "#2D4183" />
=======
        <Icon1 name="book" size={40} color= "#2D4183" />
>>>>>>> e116bcd (feat: MeunBar 화면 전환)
        <Text style={styles.tabText}>스터디</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, currentTab === 'MeetPage' && styles.activeTab]}
        onPress={() => handleTabPress('MeetPage')}>
<<<<<<< HEAD
        <Icon name="flash" size={40} color= "#2D4183" />
        <Text style={styles.tabText}>번개</Text>
      </TouchableOpacity>
      
=======
        <Icon1 name="flash" size={40} color= "#2D4183" />
        <Text style={styles.tabText}>번개</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, currentTab === 'MyPage' && styles.activeTab]}
        onPress={() => setSubMenuVisible(!subMenuVisible)}>
        <Icon1 name="menu" size={40} color="#2D4183" />
        <Text style={styles.tabText}>마이</Text>
      </TouchableOpacity>

      {/* moreMenuVisible이 true일 때 SubMenu 렌더링 */}
      {subMenuVisible && (
        <SubMenu onClose={handleCloseMenu} onNavigate={handleNavigate} />
      )}
>>>>>>> e116bcd (feat: MeunBar 화면 전환)
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
    borderBottomColor: '#2D4183',
  },
  tabText: {
    fontSize: 14,
    color: '#333',
  },
});

export default MenuBar;
