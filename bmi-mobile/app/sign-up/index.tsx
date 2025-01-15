import { RelativePathString, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { sign_up } from "@/app/firebase/app/auth";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleSignUp = async () => {
        if (!email || !password || !confirmPassword) {
            setErrorMessage('Please fill in all fields.');
        } else if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
        } else {
            // Handle sign-up logic here (API call or Firebase)
            console.log('Email:', email);
            console.log('Password:', password);
            console.log('Confirm Password:', confirmPassword);
            const response = await sign_up(email, password);
            console.log(response);
            setErrorMessage(response);
            // On success, you can navigate to another page
        }
    };

    return (
        <View className="flex-1 justify-center p-6 bg-gray-100">
            <Text className="text-3xl font-bold text-center mb-8">Sign Up</Text>
            
            {/* Email Input */}
            <TextInput
                value={email}
                onChangeText={setEmail}
                className="h-12 border border-gray-300 rounded-md p-3 mb-4 text-gray-800"
                placeholder="Email"
                keyboardType="email-address"
            />
            
            {/* Password Input */}
            <TextInput
                value={password}
                onChangeText={setPassword}
                className="h-12 border border-gray-300 rounded-md p-3 mb-4 text-gray-800"
                placeholder="Password"
                secureTextEntry
            />
            
            {/* Confirm Password Input */}
            <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                className="h-12 border border-gray-300 rounded-md p-3 mb-4 text-gray-800"
                placeholder="Confirm Password"
                secureTextEntry
            />
            
            {/* Error Message */}
            {errorMessage ? <Text className="text-red-500 text-center mb-4">{errorMessage}</Text> : null}

            {/* Sign Up Button */}
            <TouchableOpacity
                onPress={handleSignUp}
                className="bg-blue-500 py-3 rounded-md mb-4"
            >
                <Text className="text-white text-center text-lg font-semibold">Sign Up</Text>
            </TouchableOpacity>

            {/* Footer Text */}
            <Text className="text-center mt-4">
                Already have an account? 
                <TouchableOpacity onPress={() => {router.replace('/sign-in' as RelativePathString)}}>
                    <Text className="text-blue-500 font-bold"> Sign In</Text>
                </TouchableOpacity>
            </Text>
        </View>
    );
};

export default SignUp;
