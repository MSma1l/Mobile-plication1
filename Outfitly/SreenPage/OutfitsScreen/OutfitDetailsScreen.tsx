import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type MyOutfitsStackParamList = {
  OutfitDetails: { outfitId: string };
};

type Props = NativeStackScreenProps<MyOutfitsStackParamList, 'OutfitDetails'>;

const { width } = Dimensions.get('window');

interface WardrobePhoto {
  id: string;
  image: string;
  category: string;
}

// Mapping outfit types to wardrobe categories
const outfitToCategories: Record<string, string[]> = {
  Party: ['Shirts', 'Dresses', 'Accessories', 'Backpacks', 'Jackets'],
  Formal: ['Shirts', 'Jackets', 'Pants', 'Accessories'],
  Classic: ['Shirts', 'Jeans', 'Jackets', 'Shoes'],
  Sport: ['T-shirts', 'Shorts', 'Hoodies', 'Sneakers'],
  Summer: ['T-shirts', 'Shorts', 'Dresses', 'Hats'],
  Casual: ['T-shirts', 'Jeans', 'Sweaters', 'Sneakers', 'Backpacks'],
};

const STORAGE_KEY = 'wardrobe_items';

const OutfitDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { outfitId } = route.params;
  const [wardrobePhotos, setWardrobePhotos] = useState<WardrobePhoto[]>([]);
  const [generatedOutfit, setGeneratedOutfit] = useState<WardrobePhoto[]>([]);

  useEffect(() => {
    console.log('OutfitDetailsScreen mounted');
    console.log('Param received from navigation (outfitId):', outfitId);
    loadWardrobe();
  }, []);

  const loadWardrobe = async () => {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    const items: WardrobePhoto[] = saved ? JSON.parse(saved) : [];
    setWardrobePhotos(items);
    console.log('Wardrobe loaded from storage:', items);
  };

  const generateOutfit = () => {
    console.log('--- Generate Outfit ---');
    console.log('Outfit category received (outfitId):', outfitId);

    const mappedCategories = outfitToCategories[outfitId];
    if (!mappedCategories) {
      console.warn('Categorie outfit invalidă pentru outfitId:', outfitId);
      return;
    }
    console.log('Mapped wardrobe categories for this outfit:', mappedCategories);

    const outfitResult: WardrobePhoto[] = [];

    mappedCategories.forEach(cat => {
      const photosInCategory = wardrobePhotos.filter(p => p.category === cat);
      if (photosInCategory.length === 0) {
        console.log(`No photos found for category ${cat}, skipping.`);
        return;
      }
      // Select random photo from category
      const randomPhoto = photosInCategory[Math.floor(Math.random() * photosInCategory.length)];
      console.log(`Photo selected for category ${cat}:`, randomPhoto);
      outfitResult.push(randomPhoto);
    });

    if (outfitResult.length === 0) {
      Alert.alert('No photos', 'Nu există poze în categoriile acestui outfit.');
      return;
    }

    setGeneratedOutfit(outfitResult);
    console.log('Final generated outfit photos:', outfitResult);
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Înapoi</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{outfitId} Collection</Text>

      {/* Buttons */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.actionButton} onPress={generateOutfit}>
          <Text style={styles.buttonText}>Generate Outfit</Text>
        </TouchableOpacity>
      </View>

      {/* Generated Outfit */}
      {generatedOutfit.length > 0 && (
        <FlatList
          data={generatedOutfit}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.generatedContainer}>
              <Image source={{ uri: item.image }} style={styles.generatedImage} resizeMode="cover" />
              <Text style={styles.categoryLabel}>{item.category}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingVertical: 16 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },

  backButton: {
    backgroundColor: '#1f6feb',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  backText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#1f6feb',
    padding: 12,
    borderRadius: 12,
    marginRight: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  generatedContainer: {
    width: width * 0.6,
    height: width * 0.8,
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
  },
  generatedImage: {
    width: '100%',
    height: '85%',
    borderRadius: 16,
  },
  categoryLabel: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default OutfitDetailsScreen;
