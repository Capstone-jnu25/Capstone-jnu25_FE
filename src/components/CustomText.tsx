import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';

interface CustomTextProps extends TextProps {
    children: React.ReactNode;
    style?: object;
}

const CustomText: React.FC<CustomTextProps> = ({ children, style, ...props }) => {
    return (
        <Text style={[styles.text, style]} {...props}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        backgroundColor: '#fff',
        height: 45,
        borderColor: '#95CEFF',
        borderWidth: 3,
        width: '70%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        fontSize: 15, // 텍스트 크기
        marginTop: 5,
        marginBottom: 5,
        marginRight: 10,
    },
});

export default CustomText;
