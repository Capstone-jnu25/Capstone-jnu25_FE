import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons';

interface Props {
  iconName: string;
  onPress: () => void;
  style?: ViewStyle;
  iconSize?: number;
  iconColor?: string;
}

const CircleButton: React.FC<Props> = ({
  iconName,
  onPress,
  style,
  iconSize = 28,
  iconColor = '#fff',
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Icon name={iconName} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#2D4183',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20,
  },
});

export default CircleButton;