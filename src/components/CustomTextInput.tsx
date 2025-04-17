import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

type CustomTextInputProps = {
  placeholder: string;
//  value: string;
//  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  style?: object;
};

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  placeholder,
//  value,
//  onChangeText,
  secureTextEntry = false,
  style
}) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
    //  value={value}
    //  onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
      placeholderTextColor="#D2D2D2" // 회색 텍스트
      textAlign="center" // 텍스트 가운데 정렬
    />
  );
};

const styles = StyleSheet.create({
    input: {
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
        fontSize: 12, // 텍스트 크기
        fontWeight: 'bold', // 텍스트 두께
      },
});

export default CustomTextInput;
