import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

type CategoryProps = { label: string; };

const CategoryStyle = (label: string) => {
    switch (label) {
        case '분실물' :
            return { backgroundColor: '#DFFED1' };
        case '중고' :
            return { backgroundColor: '#FFBEC9' };
        case '스터디' :
            return { backgroundColor: '#95CEFF' };
        case '번개' :
            return { backgroundColor: '#FFEA80' };
        default:
            return { backgroundColor: '#fff' };
    }
};

const Category: React.FC<CategoryProps> = ({ label }) => {
    const { backgroundColor } = CategoryStyle(label);

    return (
        <View style={[styles.categoryContainer, { backgroundColor }]}>
            <Text style={{ fontWeight: 'bold' }}>{label}</Text>
      </View>
    );
};

const styles = StyleSheet.create({
    categoryContainer: {
        width: 70,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        alignItems: 'center',
    },
  });
  
export default Category;