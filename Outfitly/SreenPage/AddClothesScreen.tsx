import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Definește parametrii navigatorului
type RootStackParamList = {
  AddClothesScreen: undefined;
};

type AddClothesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AddClothesScreen'
>;

interface Props {
  navigation: AddClothesScreenNavigationProp;
}

const AddClothesScreen: React.FC<Props> = ({ navigation }) => {
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // Cerere permisiune cameră
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisiune necesară', 'Permisiunea pentru cameră este necesară!');
      return;
    }

    // Deschide camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    // Verifică rezultatul
    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleNext = () => {
    if (!category || !color || !image) {
      Alert.alert('Eroare', 'Alege categoria, culoarea și fă poza!');
      return;
    }
    console.log({ category, color, image });
    Alert.alert('Succes', 'Haina a fost adăugată!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adaugă o haină</Text>

      <Text>Categoria:</Text>
      <Button title="Tricou" onPress={() => setCategory('Tricou')} />
      <Button title="Pantaloni" onPress={() => setCategory('Pantaloni')} />

      <Text>Culoarea:</Text>
      <Button title="Roșu" onPress={() => setColor('Roșu')} />
      <Button title="Albastru" onPress={() => setColor('Albastru')} />

      <Button title="Fă o poză" onPress={pickImage} />

      {image && <Text style={{ marginTop: 10 }}>Imagine selectată!</Text>}

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddClothesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#ff2e84',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  nextText: { color: '#fff', fontSize: 18 },
});
