import React, { useContext } from 'react';
import { Text, View, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { foodContext } from '@/app/components/lab';

interface FoodCardProps {
    Name: string;
    Description: string;
    Calories: string;
    Type: string;
}

const FoodCard = ({ Name, Description, Calories, Type }: FoodCardProps) => {
    const state = useContext(foodContext);
    const selected = state.food === Name;

    // Default icon path
    var Path = require("@/assets/images/icon.png");
    
    // Define type for food images object
    const foodImages: Record<string, ImageSourcePropType> = {
        'Beef': require("@/assets/images/food/Beef.png"),
        'Chickin': require("@/assets/images/food/Chickin.png"),
        'Salad': require("@/assets/images/food/Salad.png"),
        'Chilli': require("@/assets/images/food/Chilli.png"),
        'Choco': require("@/assets/images/food/Chocolate.png"),
        'Fries': require("@/assets/images/food/Fries.png"),
        'Paper': require("@/assets/images/food/Paper.png"),
        'Hammer': require("@/assets/images/food/Hammer.png")
    };

    // Set the path using the name or default to the icon
    Path = foodImages[Name] || Path;

    return (
        <TouchableOpacity
            onPress={() => state.setFood(Name)}
            className={`p-3 rounded-xl ${selected ? 'bg-[#3B413C]' : 'bg-[#DAF0EE]'} shadow-md`}
        >
            <View className="items-center space-y-2">
                <Image 
                    source={Path}
                    style={{ width: 40, height: 40 }} 
                    resizeMode="contain"
                />
                <Text className={`text-lg font-bold ${selected ? 'text-white' : 'text-[#3B413C]'}`}>{Name}</Text>
                <Text className={`text-xs ${selected ? 'text-[#94D1BE]' : 'text-[#9DB5B2]'}`}>{Description}</Text>
                <View className={`px-2 py-1 rounded-full ${selected ? 'bg-[#94D1BE]' : 'bg-[#9DB5B2]'}`}>
                    <Text className="text-xs text-[#3B413C] font-medium">{Calories}</Text>
                </View>
                <View className={`px-2 py-1 rounded-full ${selected ? 'bg-[#DAF0EE]' : 'bg-[#3B413C]'}`}>
                    <Text className={`text-xs font-medium ${selected ? 'text-[#3B413C]' : 'text-white'}`}>{Type}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default FoodCard;
