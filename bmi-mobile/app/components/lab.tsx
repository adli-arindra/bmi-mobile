import React, { useState, useContext, createContext } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import FoodCard from '../components/foodCard';
import { Image } from "react-native";

interface person {
    weight: number,
    height: number,
    bmi: number,
}

const GetBMI = (weight: number, height: number) : number =>  {
    return weight/((height/100) * (height/100));
}

const defaultPerson: person = {
  weight: 65,
  height: 175,
  bmi: GetBMI(65, 175),
};

const GetColor = ({ bmi }: { bmi: number }) => {
  if (bmi > 30) return 'progress progress-error';
  if (bmi > 25) return 'progress progress-warning';
  if (bmi > 21.5) return 'progress progress-info';
  if (bmi > 18.5) return 'progress progress-success';
  return 'progress progress-secondary';
};

const GetTextColor = ({ bmi }: { bmi: number }) => {
  if (bmi > 30) return 'text-error text-lg';
  if (bmi > 25) return 'text-warning text-lg';
  if (bmi > 21.5) return 'text-info text-lg';
  if (bmi > 18.5) return 'text-success text-lg';
  return 'text-secondary text-lg';
};

export const foodContext = createContext<any>(undefined);

const Lab = () => {
    const [food, setFood] = useState('');
    const [currentPerson, setCurrentPerson] = useState<person>(defaultPerson);


    var path;
    if (currentPerson.bmi > 30) path = require("@/assets/images/body/300.png");
    else if (currentPerson.bmi > 25) path = require("@/assets/images/body/250.png");
    else if (currentPerson.bmi > 21.5) path = require("@/assets/images/body/230.png");
    else if (currentPerson.bmi > 18.5) path = require("@/assets/images/body/185.png");
    else path = require("@/assets/images/body/0.png");

    return (
        <foodContext.Provider value={{ food, setFood }}>
            <View className="flex flex-column bg-green-200 min-h-screen justify-between">
                <View className="w-auto min-h-96 bg-neutral rounded-3xl m-4 px-2 py-6 border-2 border-neutral border-solid">
                    <Text className="text-white text-4xl font-bold text-center pt-4">YOU</Text>
                    <View className="flex justify-center pt-5 flex-col items-center">

                    <Image 
                        source = {path}
                        style={{ width: 200, height: 200 }} 
                        resizeMode="contain"></Image>
                    <Text className={GetTextColor(currentPerson)}>BMI - {currentPerson.bmi.toFixed(2)}</Text>
                </View>

                <View className="flex justify-center items-center gap-4 mb-4 flex-col sm:flex-row">
                    <View className="btn font-bold"><Text>{currentPerson.weight} kg</Text></View>
                    <View className="btn font-bold"><Text>{currentPerson.height} cm</Text></View>
                </View>
            </View>

            <View className="w-auto bg-neutral rounded-3xl m-4 py-6 border-2 border-neutral border-solid
                            flex flex-col justify-center items-center">
                <Text className="text-white text-2xl text-center font-bold">FOOD CHOICES</Text>
                <Text className="text-neutral-content text-center text-sm mt-2">Makan apa hari ini?</Text>
                <View className="flex flex-row flex-wrap mx-8 gap-6 mt-4 items-center justify-center">
                    <FoodCard Name="Chickin" Description="Kukuruyuk" Calories="239 cal" Type="Meat" />
                    <FoodCard Name="Beef" Description="Moooo" Calories="271 cal" Type="Meat" />
                    <FoodCard Name="Salad" Description="Yummy" Calories="114 cal" Type="Veggies" />
                    <FoodCard Name="Chilli" Description="Hot!" Calories="40 cal" Type="Veggies" />
                    <FoodCard Name="Choco" Description="Sweet" Calories="555 cal" Type="Store" />
                    <FoodCard Name="Fries" Description="Nice" Calories="311 cal" Type="Good" />
                    <FoodCard Name="Paper" Description="Why" Calories="0 cal" Type="ATK" />
                    <FoodCard Name="Hammer" Description="DON'T" Calories="-123 cal" Type="Huh" />
                </View>
            </View>

        </View>
        </foodContext.Provider>
    );
};

export default Lab;
