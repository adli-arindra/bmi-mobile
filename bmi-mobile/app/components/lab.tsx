import { useEffect } from 'react';
import { ImageSourcePropType, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import FoodCard from '../components/foodCard';
import { Image } from "react-native";
import { foodsInit, useFoodContext, UserCreatedFoods } from './foodContext';
import { PersonType, usePersonContext } from '@/app/components/personContext';
import { RelativePathString, router } from 'expo-router';

const GetBMI = (weight: number, height: number) : number =>  {
    return weight/((height/100) * (height/100));
}

const GetColor = ( bmi: number ) => {
  if (bmi > 30) return 'progress progress-error';
  if (bmi > 25) return 'progress progress-warning';
  if (bmi > 21.5) return 'progress progress-info';
  if (bmi > 18.5) return 'progress progress-success';
  return 'progress progress-secondary';
};

const GetTextColor = ( bmi: number ) => {
  if (bmi > 30) return 'text-error text-lg';
  if (bmi > 25) return 'text-warning text-lg';
  if (bmi > 21.5) return 'text-info text-lg';
  if (bmi > 18.5) return 'text-success text-lg';
  return 'text-secondary text-lg';
};

const Lab = () => {
    console.log(UserCreatedFoods);
    const { food, setFood } = useFoodContext();
    const { person, setPerson } = usePersonContext();

    const bmi = GetBMI(person?.weight, person?.height);

    var path;
    if (bmi > 30) path = require("@/assets/images/body/300.png");
    else if (bmi > 25) path = require("@/assets/images/body/250.png");
    else if (bmi > 21.5) path = require("@/assets/images/body/230.png");
    else if (bmi > 18.5) path = require("@/assets/images/body/185.png");
    else path = require("@/assets/images/body/0.png");

    useEffect(() => {
        if (food !== undefined) {
            let currWeight = person.weight;
            currWeight += food.WeightDiff;
            if (currWeight < 0) currWeight = 0;
            let newPerson : PersonType = {
                weight: currWeight,
                height: person.height,
            }
            setPerson(newPerson);
        }
        setFood(undefined);
    }, [food]);

    return (
    <View className="flex flex-column bg-green-200 min-h-screen">
        <View className="w-auto min-h-96 bg-neutral rounded-3xl mx-4 px-2 py-6 border-2 border-neutral border-solid">
            <Text className="text-white text-4xl font-bold text-center pt-4">YOU</Text>
            <View className="flex justify-center pt-5 flex-col items-center">
                <Image 
                    source = {path}
                    style={{ width: 200, height: 200 }} 
                    resizeMode="contain"></Image>
                <Text className={GetTextColor(bmi)}>BMI - {bmi.toFixed(2)}</Text>
            </View>
            <View className="flex justify-center items-center gap-4 mb-4 flex-col sm:flex-row">
                <View className="btn font-bold"><Text>{person.weight} kg</Text></View>
                <View className="btn font-bold"><Text>{person.height} cm</Text></View>
            </View>
        </View>
        <View className="w-auto bg-neutral rounded-3xl m-4 py-6 border-2 border-neutral border-solid
                        flex flex-col justify-center items-center">
            <Text className="text-white text-2xl text-center font-bold">FOOD CHOICES</Text>
            <Text className="text-neutral-content text-center text-sm mt-2">Makan apa hari ini?</Text>
            <ScrollView className="py-4 mx-8 gap-6 mt-4" horizontal={true}>
            <View className="flex flex-row flex-wrap items-center justify-center gap-1">
                { foodsInit.map((food, index) => (
                    <FoodCard key={index} Name={food.Name} Calories={food.Calories} Description={food.Description}
                        Path={food.Path} Type={food.Type} WeightDiff={food.WeightDiff}/>
                ))}
                { UserCreatedFoods.map((food, index) => (
                    <FoodCard key={index} Name={food.Name} Calories={food.Calories} Description={food.Description}
                        Path={{uri: food.Path} as ImageSourcePropType} Type={food.Type} WeightDiff={food.WeightDiff}/>
                ))}
                <TouchableOpacity
                        onPress={() => {router.push('/make' as RelativePathString)}}
                        className={"p-3 rounded-xl bg-[#DAF0EE] shadow-md items-center w-28 h-full flex fkex-col "}>
                    <View className='bg-gray-400 rounded-full w-12 h-12 flex justify-center items-center mt-6'>
                        <Text className='text-4xl text-white font-bold text-center'>+</Text>
                    </View>
                    <Text className='text-xs font-bold text-gray-600 mt-4'>Add New</Text>            
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    </View>
    );
};

export default Lab;
