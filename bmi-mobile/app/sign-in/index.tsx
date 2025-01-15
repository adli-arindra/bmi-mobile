import { RelativePathString, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { signIn } from "@/app/firebase/app/auth";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleSignIn = async () => {
        if (!email || !password) {
            setErrorMessage('Please fill in both fields.');
        } else {
            // Normally you would authenticate here (e.g., with Firebase, API call)
            console.log('Email:', email);
            console.log('Password:', password);
            const response = await signIn(email, password);
            if (response) {
                setErrorMessage('');
                router.replace('/');
            }
            else {
                setErrorMessage('Sign In Failed! Check your credentials')
            }
            // Navigate to another screen upon successful sign-in (optional)
        }
    };

    return (
        <View className="flex-1 justify-center p-6 bg-gray-100">
            <Text className="text-3xl font-bold text-center mb-8">Sign In</Text>
            
            <TextInput
                style={{}}
                className="h-12 border border-gray-300 rounded-md p-3 mb-4"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            
            <TextInput
                style={{}}
                className="h-12 border border-gray-300 rounded-md p-3 mb-4"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            
            {errorMessage ? <Text className="text-red-500 text-center mb-4">{errorMessage}</Text> : null}

            <Button title="Sign In" onPress={handleSignIn} />

            <Text className="text-center mt-4">
                Don't have an account? 
                <TouchableOpacity onPress={() => {router.replace('/sign-up' as RelativePathString)}}>
                    <Text className="text-blue-500 font-bold">Sign Up</Text>
                </TouchableOpacity>
            </Text>
        </View>
    );
};

export default SignIn;
