// ProfilePage.tsx

import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { RootStackParamList } from '../../hooks/useNavigation';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SettingsScreen"
>;

const ProfilePage: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

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
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/200" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Kate</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("FavoritePage")}
        >
          <Text style={styles.buttonIcon}>❤️</Text>
          <Text style={styles.buttonText}>Favorite outfits</Text>
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
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  backButton: { marginBottom: 20 },
  backText: { fontSize: 28 },
  avatarContainer: { alignItems: "center", marginTop: 20 },
  avatar: { width: 160, height: 160, borderRadius: 20 },
  name: { fontSize: 28, fontWeight: "600", marginTop: 10 },
  buttonsContainer: { marginTop: 40 },
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
