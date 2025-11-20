import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  FlatList, 
  TouchableOpacity 
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// 🟢 Import parametrii corecți
import { OutfitStackParamList } from "./OutfitNavigator";

type Props = NativeStackScreenProps<OutfitStackParamList, "OutfitDetails">;

const OutfitDetailsScreen = ({ route }: Props) => {
  const { outfitId } = route.params;


  const [photos, setPhotos] = useState<string[]>([]);
  const storageKey = `photos_${outfitId}`;

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    const saved = await AsyncStorage.getItem(storageKey);
    if (saved) setPhotos(JSON.parse(saved));
  };

  const savePhotos = async (newPhotos: string[]) => {
    await AsyncStorage.setItem(storageKey, JSON.stringify(newPhotos));
  };

  const addPhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
    });

    if (!result.canceled) {
      const newPhotos = [...photos, result.assets[0].uri];
      setPhotos(newPhotos);
      savePhotos(newPhotos);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Collection</Text>

      <TouchableOpacity style={styles.addButton} onPress={addPhoto}>
        <Text style={styles.addText}>Add Photo</Text>
      </TouchableOpacity>

      <FlatList
        data={photos}
        keyExtractor={(item, idx) => idx.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.photo} />
        )}
        contentContainerStyle={{ paddingBottom: 60 }}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 10 },
  addButton: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  addText: { color: "#fff", textAlign: "center", fontSize: 16 },
  photo: {
    width: "48%",
    height: 180,
    borderRadius: 12,
    margin: "1%",
  },
});

export default OutfitDetailsScreen;
