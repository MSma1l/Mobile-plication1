import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = { navigation?: any };

export default function Register({ navigation }: Props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validate = (): boolean => {
        setError(null);
        if (!name.trim()) {
            setError("Numele este obligatoriu.");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Email invalid.");
            return false;
        }
        if (password.length < 6) {
            setError("Parola trebuie să aibă cel puțin 6 caractere.");
            return false;
        }
        if (password !== confirmPassword) {
            setError("Parolele nu coincid.");
            return false;
        }
        return true;
    };

    const onRegister = async () => {
        if (!validate()) return;
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("http://192.168.1.29:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, phone }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Eroare la înregistrare.");
            } else {
                // Salvează user în AsyncStorage
                await AsyncStorage.setItem("user", JSON.stringify(data.user || { email }));
                Alert.alert("Succes", data.message || "Cont creat cu succes.");
                navigation?.navigate?.("LogIn");
            }
        } catch (err: any) {
            setError(err.message || "Eroare de rețea.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Înregistrare</Text>

                {error && <Text style={styles.error}>{error}</Text>}

                <TextInput style={styles.input} placeholder="Nume complet" value={name} onChangeText={setName} autoCapitalize="words" />
                <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                <TextInput style={styles.input} placeholder="Telefon (opțional)" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
                <TextInput style={styles.input} placeholder="Parolă" value={password} onChangeText={setPassword} secureTextEntry />
                <TextInput style={styles.input} placeholder="Confirmă parola" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

                <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={onRegister} disabled={loading}>
                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Creează cont</Text>}
                </TouchableOpacity>

                <View style={styles.row}>
                    <Text>Ai deja cont? </Text>
                    <TouchableOpacity onPress={() => navigation?.navigate?.("LogIn")}>
                        <Text style={styles.link}>Autentificare</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    content: { padding: 24, alignItems: "stretch", justifyContent: "center" },
    title: { fontSize: 28, fontWeight: "600", marginBottom: 20, textAlign: "center" },
    input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12, fontSize: 16 },
    button: { backgroundColor: "#1f6feb", paddingVertical: 12, borderRadius: 8, alignItems: "center", marginTop: 8 },
    buttonDisabled: { opacity: 0.7 },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
    row: { flexDirection: "row", justifyContent: "center", marginTop: 16 },
    link: { color: "#1f6feb", fontWeight: "600" },
    error: { color: "red", marginBottom: 8, textAlign: "center" },
});
