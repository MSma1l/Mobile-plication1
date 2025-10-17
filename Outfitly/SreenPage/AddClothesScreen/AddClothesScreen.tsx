import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '../AddClothesScreen/AddClothesScreenStyle'

type RootStackParamList = {
  AddClothesScreen: undefined;
  WardrobeScreen: { newClothes: { category: string; image: string } } | undefined;
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
    jackets: false,
    dresses: false,
    skirts: false,
    shorts: false,
    hoodies: false,
  });
  const [image, setImage] = useState<string | null>(null);

  const categoriesList = [
    { key: 'tshirts', label: 'T-shirt' },
    { key: 'shirts', label: 'Shirt' },
    { key: 'jeans', label: 'Jeans' },
    { key: 'jackets', label: 'Jacket' },
    { key: 'dresses', label: 'Dress' },
    { key: 'skirts', label: 'Skirt' },
    { key: 'shorts', label: 'Shorts' },
    { key: 'hoodies', label: 'Hoodie' },
  ];

  const pickImageFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Camera permission is needed!');
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

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Media library permission is needed!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const toggleCategory = (category: keyof typeof categories) => {
    setCategories(prev => ({
      tshirts: category === 'tshirts' ? !prev.tshirts : false,
      shirts: category === 'shirts' ? !prev.shirts : false,
      jeans: category === 'jeans' ? !prev.jeans : false,
      jackets: category === 'jackets' ? !prev.jackets : false,
      dresses: category === 'dresses' ? !prev.dresses : false,
      skirts: category === 'skirts' ? !prev.skirts : false,
      shorts: category === 'shorts' ? !prev.shorts : false,
      hoodies: category === 'hoodies' ? !prev.hoodies : false,
    }));
  };

  const handleNext = () => {
    const selectedCategory = (Object.keys(categories) as Array<keyof typeof categories>)
      .find(cat => categories[cat]);
    if (!selectedCategory || !image) {
      Alert.alert('Error', 'Select a category and add a photo!');
      return;
    }

    navigation.navigate('WardrobeScreen', { newClothes: { category: selectedCategory, image } });

    console.log({ category: selectedCategory, image });
    Alert.alert('Success', 'Clothing item added!');
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add a clothing item</Text>

      <Text style={{ marginVertical: 10 }}>Category:</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {categoriesList.map(cat => (
          <View
            key={cat.key}
            style={{ width: '33%', flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}
          >
            <Switch
              value={categories[cat.key as keyof typeof categories]}
              onValueChange={() => toggleCategory(cat.key as keyof typeof categories)}
            />
            <Text style={{ marginLeft: 5 }}>{cat.label}</Text>
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
        <TouchableOpacity style={[styles.photoButton, { flex: 1, marginRight: 5 }]} onPress={pickImageFromCamera}>
        <Text style={styles.photoText}>Take Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.photoButton, { flex: 1, marginLeft: 5 }]} onPress={pickImageFromGallery}>
        <Text style={styles.photoText}>Choose from Gallery</Text>
        </TouchableOpacity>
      </View>

      {image && (
      <>
        <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 10 }} />
    
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>Upload</Text>
        </TouchableOpacity>
      </>
    )}
    </ScrollView>
  );
};

export default AddClothesScreen;
