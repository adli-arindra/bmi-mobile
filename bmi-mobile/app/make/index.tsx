import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, Alert, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FoodType, UserCreatedFoods } from '../components/foodContext';
import { router } from 'expo-router'; // Import router untuk navigasi

const FoodFormPage = () => {
  const [food, setFood] = useState<FoodType>({
    Name: '',
    Description: '',
    Calories: 0,
    Type: '',
    Path: undefined,
    WeightDiff: 0,
  });

  const handleChange = (field: keyof FoodType, value: string | number) => {
    setFood((prevFood) => ({
      ...prevFood,
      [field]: value,
    }));
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'We need permission to access your media library!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setFood((prevFood: any) => ({
        ...prevFood,
        Path: pickerResult.assets[0].uri,
      }));
    }
  };

  const handleSubmit = () => {
    try {
      UserCreatedFoods.push(food);
      Alert.alert('Success', 'Food submitted successfully!');
      router.replace('/'); // Navigasi ke dashboard/lab.tsx
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Tombol Back */}
      <View style={styles.backButtonContainer}>
        <Button
          title="Back"
          onPress={() => router.replace('/')} // Navigasi ke lab.tsx
          color="#3B413C"
        />
      </View>

      <View style={styles.form}>
        <Text style={styles.title}>Food Form</Text>

        {/* Name */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={food.Name}
          onChangeText={(text) => handleChange('Name', text)}
        />

        {/* Description */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Description"
          value={food.Description}
          onChangeText={(text) => handleChange('Description', text)}
        />

        {/* Calories */}
        <Text style={styles.label}>Calories</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Calories"
          value={food.Calories.toString()}
          keyboardType="numeric"
          onChangeText={(text) => handleChange('Calories', parseInt(text) || 0)}
        />

        {/* Type */}
        <Text style={styles.label}>Type</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Type"
          value={food.Type}
          onChangeText={(text) => handleChange('Type', text)}
        />

        {/* Weight Gain */}
        <Text style={styles.label}>Weight Gain</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Weight Gain"
          value={food.WeightDiff.toString()}
          keyboardType="numeric"
          onChangeText={(text) => handleChange('WeightDiff', parseInt(text) || 0)}
        />

        {/* Display the selected image */}
        {food.Path && (
          <Image
            source={{ uri: food.Path as string }}
            style={styles.image}
          />
        )}

        {/* Pick Image Button */}
        <View style={styles.buttonContainer}>
          <Button title="Pick an Image" onPress={pickImage} color="#3B413C" />
        </View>

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} color="#94D1BE" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#DAF0EE',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#3B413C',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#3B413C',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#9DB5B2',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 8,
  },
  buttonContainer: {
    marginVertical: 10,
    alignSelf: 'center',
    width: '50%',
  },
});

export default FoodFormPage;
