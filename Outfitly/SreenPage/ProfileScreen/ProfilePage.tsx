// ProfilePage.tsx

import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import { RootStackParamList } from "../../hooks/useNavigation";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SettingsScreen"
>;

const ProfilePage: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [avatar, setAvatar] = useState("https://randomuser.me/api/portraits/men/75.jpg");

  const pickImage = async () => {
    // Cere permisiunea pentru galerie
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permisiune necesară", "Avem nevoie de acces la galerie pentru a schimba poza.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      {/* Avatar */}
      <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
        <Image
          source={{ uri: avatar }}
          style={styles.avatar}
        />
      </TouchableOpacity>
      <Text style={styles.name}>Ford Focus</Text>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("FavoritePage")}
        >
          <Text style={styles.buttonIcon}>❤️</Text>
          <Text style={styles.buttonText}>Favorite Outfits</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SettingsScreen")}
        >
          <Text style={styles.buttonIcon}>⚙️</Text>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AboutPage")}
        >
          <Text style={styles.buttonIcon}>ℹ️</Text>
          <Text style={styles.buttonText}>Help & About</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff", alignItems: "center" },
  backButton: { alignSelf: "flex-start", marginBottom: 20 },
  backText: { fontSize: 28 },
  avatarContainer: { marginTop: 10 },
  avatar: { width: 160, height: 160, borderRadius: 80, borderWidth: 3, borderColor: "#ccc" },
  name: { fontSize: 28, fontWeight: "600", marginTop: 10, textAlign: "center" },
  buttonsContainer: { marginTop: 40, width: "100%" },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  buttonIcon: { fontSize: 22 },
  buttonText: { fontSize: 18, marginLeft: 10 },
});

export default ProfilePage;
