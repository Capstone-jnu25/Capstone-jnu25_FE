import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface CustomCheckboxProps {
    label: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label, checked = false, onChange }) => {
    const [isChecked, setIsChecked] = useState(checked);

    const toggleCheckbox = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={toggleCheckbox}>
            <View style={[styles.checkbox, isChecked && styles.checked]}>
                {isChecked && <Icon name="checkmark" size={16} color="white" />}
            </View>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#233b6d',
        borderRadius: 5,
        marginTop: 2,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        backgroundColor: '#233b6d',
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
});

export default CustomCheckbox;
