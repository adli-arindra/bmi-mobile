import { RelativePathString, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { sign_in } from "@/app/firebase/app/auth"; // Pastikan path ini sesuai dengan struktur proyek Anda

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleLogIn = async () => {
        if (!email || !password) {
            setErrorMessage('Please fill in both fields.');
        } else {
            try {
                const response = await sign_in(email, password);
                if (response) {
                    setErrorMessage('');
                    router.replace('/'); // Navigasi ke halaman utama setelah berhasil
                } else {
                    setErrorMessage('Log In Failed! Check your credentials.');
                }
            } catch (error) {
                console.error('Log In error:', error);
                setErrorMessage('An error occurred during Log In.');
            }
        }
    };

    return (
        <View style={styles.container}>
            {/* Tombol Back */}
            <View style={styles.backButtonContainer}>
                <Button
                    title="Back"
                    onPress={() => router.replace('/')} // Kembali ke halaman utama
                    color="#3B413C" // Warna tombol sesuai palet
                />
            </View>

            <Text style={styles.title}>Log In</Text>

            {/* Email Input */}
            <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#9DB5B2" // Placeholder sesuai palet
                keyboardType="email-address"
            />

            {/* Password Input */}
            <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#9DB5B2"
                secureTextEntry
            />

            {/* Error Message */}
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

            {/* Log In Button */}
            <TouchableOpacity onPress={handleLogIn} style={styles.logInButton}>
                <Text style={styles.logInButtonText}>Log In</Text>
            </TouchableOpacity>

            {/* Footer Text */}
            <Text style={styles.footerText}>
                Don't have an account?{' '}
                <TouchableOpacity onPress={() => router.replace('/sign-up' as RelativePathString)}>
                    <Text style={styles.linkText}>Sign Up</Text>
                </TouchableOpacity>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#DAF0EE', // Background sesuai palet
    },
    backButtonContainer: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 20, // Jarak aman untuk iOS dan Android
        left: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#3B413C', // Warna teks sesuai palet
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#9DB5B2', // Warna border sesuai palet
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#FFFFFF', // Background input putih
        color: '#3B413C', // Warna teks sesuai palet
    },
    error: {
        color: '#FF0000', // Warna merah untuk error
        textAlign: 'center',
        marginBottom: 10,
    },
    logInButton: {
        backgroundColor: '#94D1BE', // Warna tombol sesuai palet
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    logInButtonText: {
        color: '#FFFFFF', // Warna teks tombol putih
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerText: {
        textAlign: 'center',
        color: '#666', // Warna footer teks abu-abu
    },
    linkText: {
        color: '#38D1F6', // Warna link sesuai palet
        fontWeight: 'bold',
    },
});

export default LogIn;
