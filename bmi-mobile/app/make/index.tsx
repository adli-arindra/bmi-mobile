import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImageSourcePropType } from 'react-native';
import { FoodType } from '../components/foodContext';
import { UserCreatedFoods } from '../components/foodContext';
import { router } from 'expo-router';

interface PickerType {
    cancelled: boolean,
    uri: ImageSourcePropType
}

const FoodFormPage = () => {
  const [food, setFood] = useState<FoodType>({
    Name: '',
    Description: '',
    Calories: 0,
    Type: '',
    Path: undefined,  // Default image, change path as needed
    WeightDiff: 0,
  });

  const handleChange = (field: keyof FoodType, value: string | number) => {
    setFood((prevFood: FoodType) => ({
      ...prevFood,
      [field]: value,
    }));
  };

  const pickImage = async () => {
    // Request permission to access media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission required', 'We need permission to access your media library!');
      return;
    }

    // Launch the image picker
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.canceled) {
      // Set the picked image as the Path
      setFood((prevFood: FoodType) => ({
        ...prevFood,
        Path: pickerResult.assets[0].uri,
      } as FoodType));
    }
  };

  const handleSubmit = () => {
    try {   
        UserCreatedFoods.push(food);
        console.log('Food data submitted:', food);
        router.replace('/');
    } catch(err) {
        console.error(err);
    }
    // Alert.alert('Form submitted', JSON.stringify(food, null, 2));
  };

  return (
    <View className="flex-1 justify-center items-center p-5 bg-white">
      <Text className="text-2xl font-bold mb-6">Food Form</Text>

      {/* Name */}
      <TextInput
        className="w-full p-3 mb-4 border border-gray-300 rounded-md"
        placeholder="Enter Name"
        value={food.Name}
        onChangeText={(text) => handleChange('Name', text)}
      />

      {/* Description */}
      <TextInput
        className="w-full p-3 mb-4 border border-gray-300 rounded-md"
        placeholder="Enter Description"
        value={food.Description}
        onChangeText={(text) => handleChange('Description', text)}
      />

      {/* Calories */}
      <TextInput
        className="w-full p-3 mb-4 border border-gray-300 rounded-md"
        placeholder="Enter Calories"
        value={food.Calories.toString()}
        onChangeText={(text) => handleChange('Calories', text)}
        keyboardType='numeric'
      />

      {/* Type */}
      <TextInput
        className="w-full p-3 mb-4 border border-gray-300 rounded-md"
        placeholder="Enter Type"
        value={food.Type}
        onChangeText={(text) => handleChange('Type', text)}
      />

      {/* Weight Difference */}
      <TextInput
        className="w-full p-3 mb-4 border border-gray-300 rounded-md"
        placeholder="Enter Weight Difference"
        value={food.WeightDiff.toString()}
        keyboardType="numeric"
        onChangeText={(text) => handleChange('WeightDiff', Number(text))}
      />

      {/* Pick Image Button */}
      <Button title="Pick an Image" onPress={pickImage} />

      {/* Display the selected image */}
      {food.Path && (
        <Image
          source={{ uri: food.Path as string }}
          className="w-36 h-36 mt-6 rounded-xl"
        />
      )}

      {/* Submit Button */}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default FoodFormPage;
