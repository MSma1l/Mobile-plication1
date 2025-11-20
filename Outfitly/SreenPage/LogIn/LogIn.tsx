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

type Props = {
    navigation?: any;
};

export default function LogIn({ navigation }: Props) {
    const [identifier, setIdentifier] = useState(""); // email sau nume de utilizator
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validate = (): boolean => {
        setError(null);
        if (!identifier.trim()) {
            setError("Introduceți email-ul.");
            return false;
        }
        if (password.length < 6) {
            setError("Parola trebuie să aibă cel puțin 6 caractere.");
            return false;
        }
        return true;
    };

    const onLogin = async () => {
        if (!validate()) return;

        setLoading(true);
        try {
            // API-ul tău Flask
            const response = await fetch("http://192.168.1.29:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: identifier, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Eroare la autentificare.");
            }

            // Salvăm userul în AsyncStorage
            await AsyncStorage.setItem("user", JSON.stringify(data.user));

            setLoading(false);
            Alert.alert("Succes", "Autentificare reușită.");

            // Navigare către AppNavigator -> BottomTabs
            navigation?.reset({
                index: 0,
                routes: [{ name: "AppNavigator", params: { screen: "HomeScreen" } }],
            });
        } catch (err: any) {
            setLoading(false);
            setError(err.message || "Eroare de rețea.");
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Autentificare</Text>

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={identifier}
                    onChangeText={setIdentifier}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Parolă"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={[styles.button, loading ? styles.buttonDisabled : null]}
                    onPress={onLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Conectează-te</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.row}>
                    <TouchableOpacity onPress={() => navigation?.navigate?.("Register")}>
                        <Text style={styles.link}>Cont nou? Înregistrare</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <TouchableOpacity
                        onPress={() => Alert.alert("Recuperare parolă", "Pagina de resetare aici.")}
                    >
                        <Text style={styles.link}>Am uitat parola</Text>
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
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 12,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#1f6feb",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 8,
    },
    buttonDisabled: { opacity: 0.7 },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
    row: { flexDirection: "row", justifyContent: "center", marginTop: 12 },
    link: { color: "#1f6feb", fontWeight: "600" },
    error: { color: "red", marginBottom: 8, textAlign: "center" },
});
