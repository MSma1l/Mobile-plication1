import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../style/global';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🏠 Home Page</Text>
      <Text style={styles.text}>Hello Word </Text>
    </View>
  );
}
