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
  { id: '1', category: 'Dresses', image: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Rochie' },
  { id: '2', category: 'Accessories', image: 'https://via.placeholder.com/150/000000/FFFFFF?text=Ochelari' },
  { id: '3', category: 'Jeans', image: 'https://via.placeholder.com/150/4169E1/FFFFFF?text=Blugi' },
  { id: '4', category: 'Hats', image: 'https://via.placeholder.com/150/FFD700/000000?text=Palarie' },
  { id: '5', category: 'T-shirts', image: 'https://via.placeholder.com/150/87CEFA/000000?text=Tricou' },
  { id: '6', category: 'Dresses', image: 'https://via.placeholder.com/150/FF69B4/FFFFFF?text=Rochie+Roz' },
  { id: '7', category: 'Jackets', image: 'https://via.placeholder.com/150/3CB371/FFFFFF?text=Vesta' },
  { id: '8', category: 'Hats', image: 'https://via.placeholder.com/150/2F4F4F/FFFFFF?text=Palarie+Neagra' },
  { id: '9', category: 'Shirts', image: 'https://via.placeholder.com/150/ADD8E6/000000?text=Camasa+Polo' },
  { id: '10', category: 'Backpacks', image: 'https://via.placeholder.com/150/FF4500/FFFFFF?text=Rucsac' },
  { id: '11', category: 'Accessories', image: 'https://via.placeholder.com/150/A0522D/FFFFFF?text=Geanta' },
  { id: '12', category: 'Shirts', image: 'https://via.placeholder.com/150/000000/FFFFFF?text=Camasa+Neagra' },
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