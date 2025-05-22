import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Logo = () => (
  <View style={styles.logoContainer}>
    <Image source={require('../assets/logo.png')} style={styles.logo} />
  </View>
);

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50, 
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default Logo;
