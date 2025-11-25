// WardrobeScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
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
  'T-shirts',
  'Shirts',
  'Jeans',
  'Sweaters',
  'Jackets',
  'Dresses',
  'Hats',
  'Accessories',
  'Backpacks',
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

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.wardrobeTitle}>Wardrobe</Text>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>Chișinău, 12°C</Text>
          <Ionicons name="sunny-outline" size={20} color="#000" />
        </View>
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
                <View style={styles.clothingImageWrapper}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.clothingImage}
                    resizeMode="cover"
                  />
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WardrobeScreen;
