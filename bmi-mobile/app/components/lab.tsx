import React, { useState, useContext, createContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, ImageSourcePropType, Image } from 'react-native';
import FoodCard from '../components/foodCard';

interface Person {
    weight: number;
    height: number;
    bmi: number;
}

const GetBMI = (weight: number, height: number): number => {
    return weight / ((height / 100) * (height / 100));
}

const defaultPerson: Person = {
    weight: 65,
    height: 175,
    bmi: GetBMI(65, 175),
};

const GetBMIStatus = (bmi: number) => {
    if (bmi > 30) return 'Obese';
    if (bmi > 25) return 'Overweight';
    if (bmi > 21.5) return 'Normal+';
    if (bmi > 18.5) return 'Normal';
    return 'Underweight';
};

const GetColor = (bmi: number) => {
    if (bmi > 30) return '#3B413C';  // Dark slate
    if (bmi > 25) return '#9DB5B2';  // Sage
    if (bmi > 21.5) return '#DAF0EE'; // Light mint
    if (bmi > 18.5) return '#94D1BE'; // Mint
    return '#FFFFFF';  // White
};

export const foodContext = createContext<any>(undefined);

const Lab = () => {
    const [food, setFood] = useState('');
    const [currentPerson, setCurrentPerson] = useState<Person>(defaultPerson);

    var path: ImageSourcePropType;
    if (currentPerson.bmi > 30) path = require("@/assets/images/body/300.png");
    else if (currentPerson.bmi > 25) path = require("@/assets/images/body/250.png");
    else if (currentPerson.bmi > 21.5) path = require("@/assets/images/body/230.png");
    else if (currentPerson.bmi > 18.5) path = require("@/assets/images/body/185.png");
    else path = require("@/assets/images/body/0.png");

    useEffect(() => {
        if (food !== '') {
            let currWeight = currentPerson.weight;
            const foodEffects: Record<string, number> = {
                'Chickin': 1, 'Beef': 2, 'Salad': -1, 'Chilli': -2,
                'Choco': 4, 'Fries': 3, 'Paper': -3, 'Hammer': -5
            };
            currWeight += foodEffects[food] || 0;
            if (currWeight < 0) currWeight = 0;
            
            setCurrentPerson({
                weight: currWeight,
                height: currentPerson.height,
                bmi: GetBMI(currWeight, currentPerson.height)
            });
        }
        setFood('');
    }, [food]);

    return (
        <foodContext.Provider value={{ food, setFood }}>
            <ScrollView className="flex-1 bg-[#DAF0EE]">
                <View className="p-4">
                    {/* Profile Card */}
                    <View className="bg-[#3B413C] rounded-3xl p-6 shadow-lg">
                        <Text className="text-white text-3xl font-bold text-center mb-4">Your Health Profile</Text>
                        
                        <View className="items-center mb-6">
                            <Image 
                                source={path}
                                style={{ width: 180, height: 180 }} 
                                resizeMode="contain"
                            />
                            <View className="bg-[#9DB5B2] px-6 py-2 rounded-full mt-4">
                                <Text className="text-[#3B413C] text-xl font-bold">
                                    BMI: {currentPerson.bmi.toFixed(1)} - {GetBMIStatus(currentPerson.bmi)}
                                </Text>
                            </View>
                        </View>

                        <View className="flex-row justify-around">
                            <View className="bg-[#94D1BE] px-6 py-3 rounded-xl">
                                <Text className="text-[#3B413C] text-lg font-bold">{currentPerson.weight} kg</Text>
                            </View>
                            <View className="bg-[#94D1BE] px-6 py-3 rounded-xl">
                                <Text className="text-[#3B413C] text-lg font-bold">{currentPerson.height} cm</Text>
                            </View>
                        </View>
                    </View>

                    {/* Food Section */}
                    <View className="bg-[#9DB5B2] rounded-3xl mt-4 p-6 shadow-lg">
                        <Text className="text-[#3B413C] text-2xl font-bold text-center mb-2">Food Choices</Text>
                        <Text className="text-[#3B413C] text-center mb-4">What would you like to eat today?</Text>
                        
                        <View className="flex-row flex-wrap justify-center gap-4">
                            <FoodCard Name="Chickin" Description="Protein Rich" Calories="239 cal" Type="Meat" />
                            <FoodCard Name="Beef" Description="Iron Rich" Calories="271 cal" Type="Meat" />
                            <FoodCard Name="Salad" Description="Fresh & Healthy" Calories="114 cal" Type="Veggies" />
                            <FoodCard Name="Chilli" Description="Metabolism Boost" Calories="40 cal" Type="Veggies" />
                            <FoodCard Name="Choco" Description="Sweet Treat" Calories="555 cal" Type="Snack" />
                            <FoodCard Name="Fries" Description="Crispy" Calories="311 cal" Type="Snack" />
                            <FoodCard Name="Paper" Description="Not Food!" Calories="0 cal" Type="Inedible" />
                            <FoodCard Name="Hammer" Description="Dangerous!" Calories="-123 cal" Type="Tool" />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </foodContext.Provider>
    );
};

export default Lab;
