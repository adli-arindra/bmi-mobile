import React, { useContext, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { foodContext, useFoodContext } from '@/app/components/foodContext';

const FoodCard = ({ Name, Description, Calories, Type } : 
    { Name: string, Description: string, Calories: string, Type: string}) => {
    const { food, setFood } = useFoodContext();
    const selected = food === Name;
    
    const handlePress = () => {
        setFood(Name);
    }


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
    
    var Path = require("@/assets/images/dino.png");
    Path = foodImages[Name] || Path;
    return (
        <TouchableOpacity
        onPress={() => handlePress()}
        className={`p-3 rounded-xl ${selected ? 'bg-[#3B413C]' : 'bg-[#DAF0EE]'} shadow-md items-center`}>
            <Image 
                source={Path}
                style={{ width: 30, height: 30 }} 
                resizeMode="contain"
            />
                <Text className={`text-lg font-bold ${selected ? 'text-white' : 'text-[#3B413C]'}`}>{Name}</Text>
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
