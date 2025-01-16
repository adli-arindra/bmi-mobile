import React, { useContext, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { foodContext, useFoodContext } from '@/app/components/foodContext';

export interface FoodType {
    Name: string,
    Description: string,
    Calories: string,
    Type: string,
    Path: ImageSourcePropType,
    WeightDiff: number,
}

const FoodCard = ({ Name, Description, Calories, Type, Path, WeightDiff }: 
    FoodType) => {
    const { food, setFood } = useFoodContext();
    const self: FoodType = {
        Name: Name,
        Description: Description,
        Calories: Calories,
        Type: Type,
        Path: Path,
        WeightDiff: WeightDiff
    }
    const selected =  food ? food.Name === self.Name : false
    
    const handlePress = () => {
        setFood(self);
    }
    
    return (
        <TouchableOpacity
        onPress={() => handlePress()}
        className={`p-3 rounded-xl ${selected ? 'bg-[#3B413C]' : 'bg-[#DAF0EE]'} shadow-md items-center w-28 h-full`}>
            <Image 
                source={Path}
                style={{ width: 30, height: 30 }} 
                resizeMode="contain"
            />
                <Text className={`text-sm font-bold ${selected ? 'text-white' : 'text-[#3B413C]'}`}>{Name}</Text>
                <Text className={`text-xs ${selected ? 'text-[#94D1BE]' : 'text-[#9DB5B2]'}`}>{Description}</Text>
                <View className={`px-2 py-1 rounded-full ${selected ? 'bg-[#94D1BE]' : 'bg-[#9DB5B2]'}`}>
                    <Text className="text-xs text-[#3B413C] font-medium">{Calories}</Text>
                </View>
                <View className={`px-2 py-1 rounded-full ${selected ? 'bg-[#DAF0EE]' : 'bg-[#3B413C]'} mt-1`}>
                    <Text className={`text-xs font-medium ${selected ? 'text-[#3B413C]' : 'text-white'}`}>{Type}</Text>
                </View>
        </TouchableOpacity>
    );
};

export default FoodCard;
