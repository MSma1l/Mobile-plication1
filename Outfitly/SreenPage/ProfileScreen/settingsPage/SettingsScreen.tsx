import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const [username, setUsername] = useState("Chistol");
  const [password, setPassword] = useState("123456");
  const [phone, setPhone] = useState("000-000-0000");

  const handleDeleteAccount = () => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to delete your account?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => Alert.alert("Account deleted") },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Username */}
      <Text style={styles.text}>Username</Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} />

      {/* Password */}
      <Text style={styles.text}>Password</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />

      {/* Phone */}
      <Text style={styles.text}>Phone</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

      {/* Delete Account */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteButtonText}>Delete Account</Text>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 28, fontWeight: "600", marginBottom: 20 },
  text: { color: "#000", marginBottom: 5 },
  input: { backgroundColor: "#f0f0f0", color: "#000", padding: 10, borderRadius: 10, marginBottom: 10 },
  deleteButton: { backgroundColor: "#ff4d4d", padding: 15, borderRadius: 12, marginTop: 20 },
  deleteButtonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  backButton: { marginTop: 30 },
  backText: { color: "#000" },
});

export default SettingsScreen;
