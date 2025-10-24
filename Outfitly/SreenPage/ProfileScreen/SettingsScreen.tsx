import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../style/global';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>⚙️ Settings Page</Text>
    </View>
  );
}
