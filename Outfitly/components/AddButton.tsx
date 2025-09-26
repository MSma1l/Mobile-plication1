import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AddButtonProps {
  onPress?: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center',
    zIndex: 10,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ff2e84',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default AddButton;
