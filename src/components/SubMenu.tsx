import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationProp } from "../types";
import { RootStackParamList } from '../types';

type SubMenuProps = {
  onClose: () => void;
  onNavigate: (screen: keyof RootStackParamList) => void;
};

const SubMenu: React.FC<SubMenuProps> = ({ onClose, onNavigate }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={() => { onNavigate('MyPage'); onClose(); }}>
        <Icon name="person" size={25} color="#2D4183" />
        <Text style={styles.text}>내정보</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => {}}>
        <Icon name="chatbubble" size={25} color="#2D4183" />
        <Text style={styles.text}>채팅</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => { }}>
        <Icon name="people" size={25} color="#2D4183" />
        <Text style={styles.text}>내그룹</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => { onNavigate('NotificationPage'); onClose(); }}>
        <Icon name="notifications" size={25} color="#2D4183" />
        <Text style={styles.text}>알림</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 10,
    bottom: 80,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    elevation: 5,
    zIndex: 2,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    color: '#2D4183',
  },
});

export default SubMenu;