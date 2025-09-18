import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../style/global';

export default function AppScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📱 App Page</Text>
    </View>
  );
}
