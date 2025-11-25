// WardrobeScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles, ITEM_SIZE } from './WardrobeScreenStyle';

interface ClothesItem {
  id: string;
  category: string;
  image: string; // URI sau calea locală
}

const categories = [
  'All',
  'T-shirts👚',
  'Shirts👔',
  'Jeans👖',
  'Jackets🧥',
  'Dresses👗',
  'Shorts🩳',
  'Sweaters🧶',
  'Hoodies👕',
  'Shoes👟',
  'Hats🧢',
  'Backpacks/Bags🎒👜',
  'Accessories🕶️',
];

const STORAGE_KEY = 'wardrobe_items';

const WardrobeScreen: React.FC = () => {
  const [clothes, setClothes] = useState<ClothesItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Load data la focus
  useFocusEffect(
    React.useCallback(() => {
      const loadClothes = async () => {
        const savedData = await AsyncStorage.getItem(STORAGE_KEY);
        const items: ClothesItem[] = savedData ? JSON.parse(savedData) : [];
        console.log('Wardrobe loaded from storage:', items);
        setClothes(items);
      };
      loadClothes();
    }, [])
  );

  // Functie pentru salvare in storage
  const saveClothes = async (newClothes: ClothesItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newClothes));
      console.log('Wardrobe saved to storage:', newClothes);
    } catch (error) {
      console.log('Error saving wardrobe:', error);
    }
  };

  // Functie pentru a adauga poza manual (ex: din AddClothesScreen)
  const addPhotoToWardrobe = (newPhoto: ClothesItem) => {
    console.log('Adding new photo:', newPhoto);
    const updated = [...clothes, newPhoto];
    setClothes(updated);
    saveClothes(updated);
  };

  const filteredClothes =
    selectedCategory === 'All'
      ? clothes
      : clothes.filter(item => item.category === selectedCategory);

      const deletePhoto = async (id: string) => {
  const updated = clothes.filter(item => item.id !== id);
  setClothes(updated);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

const handleDelete = (id: string) => {
  Alert.alert(
    "Delete item",
    "Are you sure you want to delete this item?",
    [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deletePhoto(id) }
    ]
  );
};

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.wardrobeTitle}>Wardrobe</Text>
        <Image 
          source={require('../../assets/icon.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Categorii */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryBar}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={styles.categoryButton}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Grila de haine */}
      <ScrollView style={styles.mainContentScroll}>
        {filteredClothes.length === 0 ? (
          <Text style={styles.noClothesText}>
            Nu ai adăugat încă haine în categoria "{selectedCategory}".
          </Text>
        ) : (
          <View style={styles.clothesGrid}>
            {filteredClothes.map(item => (
              <View key={item.id} style={styles.clothingItemContainer}>
                <TouchableOpacity
  key={item.id}
  onLongPress={() => handleDelete(item.id)}
  style={styles.clothingItemContainer}
>
  <View style={styles.clothingImageWrapper}>
    <Image
      source={{ uri: item.image }}
      style={styles.clothingImage}
      resizeMode="cover"
    />
  </View>
</TouchableOpacity>

              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WardrobeScreen;
