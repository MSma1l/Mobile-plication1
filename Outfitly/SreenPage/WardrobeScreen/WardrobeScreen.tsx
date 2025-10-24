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
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Importă stilurile dintr-un fișier separat
import { styles } from './WardrobeScreenStyle'; 

// Definirea tipurilor
interface ClothesItem {
  id: string;
  category: string;
  image: string; // URL-ul sau calea locală a imaginii
}

interface RouteParams {
  newClothes?: ClothesItem;
}

// Date inițiale (de mutat într-un fișier de constante dacă este necesar)
const initialClothes: ClothesItem[] = [
];

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

const WardrobeScreen = () => {
  const route = useRoute();
  const [clothes, setClothes] = useState<ClothesItem[]>(initialClothes);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    // Logica de adăugare a hainelor noi
    if (route.params) {
      const { newClothes } = route.params as RouteParams;
      if (newClothes) {
        // Generăm un ID simplu pentru demonstrație
        const newId = (clothes.length + 1).toString();
        setClothes(prev => [...prev, { ...newClothes, id: newId }]);
      }
    }
  }, [route.params]);

  
  // Filtrarea hainelor în funcție de categoria selectată
  const filteredClothes = selectedCategory === 'All'
    ? clothes
    : clothes.filter(item => item.category === selectedCategory);

  // Funcția de randare a articolelor de îmbrăcăminte
  const renderClothesGrid = () => (
    <View style={styles.clothesGrid}>
      {filteredClothes.length === 0 ? (
        <Text style={styles.noClothesText}>
          Nu ai adăugat încă haine în categoria "{selectedCategory}".
        </Text>
      ) : (
        filteredClothes.map((item) => (
          <View key={item.id} style={styles.clothingItemContainer}>
            <View style={styles.clothingImageWrapper}>
              <Image
                source={{ uri: item.image }}
                style={styles.clothingImage}
                resizeMode="contain"
              />
            </View>
          </View>
        ))
      )}
    </View>
  );

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

      {/* Secțiunea de Categorii - Scroll Orizontal */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryBar}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={styles.categoryButton} // Stilul de bază al butonului
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

      {/* Secțiunea Grilă cu Haine */}
      <ScrollView style={styles.mainContentScroll}>
        {renderClothesGrid()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WardrobeScreen;