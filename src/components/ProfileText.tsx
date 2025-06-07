// components/CustomText.tsx
import React from "react";
import { View, Text, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface ProfileTextProps {
  children: string;
  style?: TextStyle;
  containerStyle?: ViewStyle;
}

const ProfileText: React.FC<ProfileTextProps> = ({ children, style, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.text, style]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
        height: 40,
        borderColor: '#95CEFF',
        borderWidth: 3,
        width: 200,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
  },
  text: {
    fontSize: 12,
    color: "#000",
    fontWeight: 'bold'
  },
});

export default ProfileText;
