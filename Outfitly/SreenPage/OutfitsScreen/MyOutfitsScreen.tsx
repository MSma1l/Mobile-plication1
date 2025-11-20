// MyOutfitsScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ListRenderItem,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useMyOutfits } from './MyOutfitsLogic';
import { Outfit } from './outfitsData';
import { OutfitStackParamList } from './OutfitNavigator'; // tipurile navigatorului tău

// Screen size for responsive cards
const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 24;

// Define navigation prop pentru tipare TypeScript
type OutfitNavProp = NativeStackNavigationProp<OutfitStackParamList, 'MyOutfits'>;

const MyOutfitsScreen: React.FC = () => {
  const navigation = useNavigation<OutfitNavProp>();

  const {
    outfits,
    categories,
    activeCategory,
    likedOutfits,
    selectCategory,
    handleGenerate,
    toggleLike,
  } = useMyOutfits();

  // Single Outfit Card
  const renderOutfit: ListRenderItem<Outfit> = ({ item }) => (
    <TouchableOpacity
      style={styles.outfitCard}
      onPress={() => navigation.navigate('OutfitDetails', { outfitId: item.id })}
    >
      <TouchableOpacity
        onPress={() => toggleLike(item.id)}
        style={styles.likeButton}
      >
        <Feather
          name="heart"
          size={20}
          color={likedOutfits.has(item.id) ? 'red' : 'black'}
          style={likedOutfits.has(item.id) ? styles.heartFilled : styles.heartOutline}
        />
      </TouchableOpacity>

      <Image
        source={item.image}
        style={styles.singleImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My outfits</Text>
          <MaterialCommunityIcons name="signature-freehand" size={28} color="black" />
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollView}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={styles.categoryButton}
              onPress={() => selectCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === category && styles.activeCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Outfits Grid */}
        <FlatList<Outfit>
          data={outfits}
          renderItem={renderOutfit}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.outfitsGrid}
          ListFooterComponent={
            <TouchableOpacity style={styles.generateButton} onPress={handleGenerate}>
              <Text style={styles.generateButtonText}>Generate outfits</Text>
            </TouchableOpacity>
          }
        />
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: { fontSize: 32, fontWeight: 'bold' },

  categoryScrollView: { paddingHorizontal: 16, paddingVertical: 10 },
  categoryButton: { paddingHorizontal: 12, paddingVertical: 6, marginRight: 8, borderRadius: 16 },
  categoryText: { fontSize: 16, color: 'gray', fontWeight: '500' },
  activeCategoryText: { color: 'black', fontWeight: 'bold', borderBottomWidth: 2, borderColor: 'black' },

  outfitsGrid: { paddingHorizontal: 12, paddingTop: 10, paddingBottom: 80 },

  outfitCard: {
    width: cardWidth,
    height: cardWidth * 1.25,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    margin: 6,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },

  likeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    padding: 4,
  },
  heartOutline: { opacity: 0.7 },
  heartFilled: {},

  singleImage: { width: '100%', height: '100%', borderRadius: 15 },

  generateButton: { backgroundColor: '#EFEFEF', padding: 16, borderRadius: 30, alignItems: 'center', marginHorizontal: 30, marginVertical: 20 },
  generateButtonText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
});

export default MyOutfitsScreen;
