// WardrobeScreenStyles.ts
import { StyleSheet, Dimensions, StatusBar } from 'react-native';

const { width } = Dimensions.get('window');
// Calculează lățimea unui element din grilă (3 pe rând, cu padding de 20 pe lateral)
export const ITEM_SIZE = (width - 80) / 3;

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight || 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  wardrobeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginRight: 5,
    fontSize: 16,
    color: '#333',
  },
  // --- Stiluri Bară Categorii ---
  categoryBar: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 5,        // reduce spațiul de jos

  },
  categoryButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 15,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  selectedCategoryButton: {
    // Aplică stilul de subliniere doar sub text, nu pe tot butonul
  },
  categoryText: {
    fontSize: 16,
    color: '#888',
  },
  selectedCategoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    borderBottomWidth: 2, // Subliniază categoria selectată
    borderBottomColor: '#000',
  },
  // --- Stiluri Grilă Haine ---
  mainContentScroll: {
    flex: 1,
    paddingHorizontal: 20, // Mută padding-ul pe ScrollView
    paddingTop: 5,
    paddingBottom: 600,

  },
  clothesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 80, // Spațiu pentru a nu fi ascuns de tab bar
    marginTop: 0,           // elimină spațiul suplimentar
  },
  clothingItemContainer: {
    width: ITEM_SIZE,
    marginBottom: 10,
    alignItems: 'center',
  },
  clothingImageWrapper: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  clothingImage: {
    width: '90%',
    height: '90%',
  },
  noClothesText: {
    marginTop: 50,
    fontSize: 16,
    color: '#666',
    width: '100%',
    textAlign: 'center',
  },
  // --- Stiluri Bară Navigare Jos (Bottom Tab Bar) ---
  bottomTabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute', // Poziționat absolut în partea de jos
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingTop: 5,
  },
  tabText: {
    fontSize: 11,
    color: '#aaa',
  },
  selectedTabText: {
    fontSize: 11,
    color: '#000',
    fontWeight: 'bold',
  },
});