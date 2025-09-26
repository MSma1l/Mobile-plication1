import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '../AddClothesScreen/AddClothesScreenStyle'
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
  const [categories, setCategories] = useState({
    tshirts: false,
    shirts: false,
    jeans: false,
  });
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisiune necesară', 'Permisiunea pentru cameră este necesară!');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const toggleCategory = (category: string) => {
    // Selectare o singură categorie
    setCategories({
      tshirts: category === 'tshirts' ? !categories.tshirts : false,
      shirts: category === 'shirts' ? !categories.shirts : false,
      jeans: category === 'jeans' ? !categories.jeans : false,
    });
  };

  const handleNext = () => {
    const selectedCategory = Object.keys(categories).find(cat => categories[cat as keyof typeof categories]);
    if (!selectedCategory || !image) {
      Alert.alert('Eroare', 'Alege categoria și fă poza!');
      return;
    }
    console.log({ category: selectedCategory, image });
    Alert.alert('Succes', 'Haina a fost adăugată!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adaugă o haină</Text>

      <Text>Categoria:</Text>

      <View style={styles.checkboxContainer}>
        <Switch
          value={categories.tshirts}
          onValueChange={() => toggleCategory('tshirts')}
        />
        <Text>T-shirts</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Switch
          value={categories.shirts}
          onValueChange={() => toggleCategory('shirts')}
        />
        <Text>Shirts</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Switch
          value={categories.jeans}
          onValueChange={() => toggleCategory('jeans')}
        />
        <Text>Jeans</Text>
      </View>

      <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
        <Text style={styles.photoText}>Fă o poză</Text>
      </TouchableOpacity>

      {image && <Text style={{ marginTop: 10 }}>Imagine selectată!</Text>}

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddClothesScreen;

